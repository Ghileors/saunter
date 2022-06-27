import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Button } from 'react-bootstrap';
import { directionOptions, mapOptions, markerOptions } from '../../configs/map.options';
import { DirectionsResult, LatLngLiteral, LatLng, MapMouseEvent } from '../../types/google';
import { ILatLng } from '../../types/google';
import { useActions } from '../../hooks/useActions';
import { fetchDirection } from '../../http/map-requests';
interface MapProps {
  center?: LatLngLiteral;
  waypoints?: ILatLng[];
  isRedactionModeOn?: boolean;
}

const getPosition = (latLng: LatLng | null) => {
  try {
    if (latLng) {
      return { position: { lat: latLng!.lat(), lng: latLng!.lng() } };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const Map: FC<MapProps> = ({ center, waypoints = [], isRedactionModeOn }) => {
  const { updateNewRouteField, setNewRouteLength } = useActions();
  const mapRef = useRef<GoogleMap>();
  const [markers, setMarkers] = useState<ILatLng[]>(waypoints);
  const [directions, setDirections] = useState<DirectionsResult>(undefined);

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const handleSetMarker = (e: MapMouseEvent) => {
    if (!isRedactionModeOn) return;
    const position = getPosition(e.latLng);
    if (position) {
      const newMarker = { ...position, id: nanoid() };
      setMarkers((prev) => [...prev, newMarker]);
      updateNewRouteField({ waypoints: [...markers, newMarker] });
    }
  };

  const handleMoveMarker = (e: MapMouseEvent, id: string) => {
    try {
      const position = getPosition(e.latLng);
      if (position) {
        const copyMarkers = markers.map((marker) => {
          if (marker.id === id) {
            return { ...marker, ...position };
          }
          return marker;
        });
        setMarkers(copyMarkers);
        updateNewRouteField({ waypoints: copyMarkers });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetMarkers = () => {
    setMarkers([]);
    setDirections(undefined);
    updateNewRouteField({ waypoints: [] });
    setNewRouteLength('');
  };

  useEffect(() => {
    if (markers.length > 1) {
      const getRDirection = async () => {
        try {
          const response: DirectionsResult = await fetchDirection(markers);
          const routeLength = response!.routes[0]!.legs[0]!.distance!.text;
          setNewRouteLength(routeLength);
          setDirections(response);
        } catch (error) {
          console.log(error);
        }
      };
      getRDirection();
    }
  }, [markers]);

  useEffect(() => () => handleResetMarkers(), []);

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      options={mapOptions}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onClick={handleSetMarker}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            ...directionOptions,
            markerOptions: {
              ...markerOptions,
              opacity: isRedactionModeOn ? 0 : 1,
              zIndex: 1,
            },
          }}
        />
      )}
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          options={{ ...markerOptions, draggable: true, zIndex: 2 }}
          onMouseUp={(e) => handleMoveMarker(e, marker.id)}
        />
      ))}
      {isRedactionModeOn && markers.length && (
        <Button
          onClick={handleResetMarkers}
          variant="link"
          className="position-absolute start-50 translate-middle-x"
        >
          Reset markers
        </Button>
      )}
    </GoogleMap>
  );
};
