import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { CustomMarker } from './CustomMarker';
import { directionOptions, mapOptions } from '../../configs/map.options';
import { DirectionsResult, LatLngLiteral, LatLng, MapMouseEvent } from '../../types/google';
import { ILatLng } from '../../types/google';
import { useActions } from '../../hooks/useActions';
import { fetchDirection } from '../../http/map-requests';
interface MapProps {
  center?: LatLngLiteral;
  waypoints?: ILatLng[];
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

export const Map: FC<MapProps> = ({ center, waypoints = [] }) => {
  const { updateNewRouteField } = useActions();
  const mapRef = useRef<GoogleMap>();
  const [markers, setMarkers] = useState<ILatLng[]>(waypoints);
  const [directions, setDirections] = useState<DirectionsResult>(undefined);

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const handleSetMarker = (e: MapMouseEvent) => {
    const position = getPosition(e.latLng);
    if (position) {
      setMarkers((prev) => [...prev, { ...position, id: nanoid() }]);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (markers.length > 1) {
      const getRDirection = async () => {
        try {
          const response: DirectionsResult = await fetchDirection(markers);
          const routeLength = response!.routes[0]!.legs[0]!.distance!.text;

          setDirections(response);
          updateNewRouteField({ routeLength, waypoints: markers });
        } catch (error) {
          console.log(error);
        }
      };
      getRDirection();
    }
  }, [markers]);

  return (
    <GoogleMap
      mapContainerClassName="map-container"
      options={mapOptions}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onClick={handleSetMarker}
    >
      {directions && <DirectionsRenderer directions={directions} options={directionOptions} />}
      {markers.map((marker) => (
        <CustomMarker
          key={marker.id}
          id={marker.id}
          position={marker.position}
          moveMarker={handleMoveMarker}
        />
      ))}
    </GoogleMap>
  );
};
