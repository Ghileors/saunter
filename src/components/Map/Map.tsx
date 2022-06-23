import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Distance } from './Distance';
import { CurrentLocationMarker } from '../CurrentLocationMarker';
import { directionOptions, mapOptions } from '../../configs/map.options';
import { DirectionsResult, LatLngLiteral, LatLng, MapMouseEvent } from '../../types/google-types';
import { ILatLng } from '../../interfaces/ILatLng';

import style from './Map.module.css';

interface MapProps {
  center: LatLngLiteral;
}

export const Map: FC<MapProps> = ({ center }) => {
  const mapRef = useRef<GoogleMap>();
  const [markers, setMarkers] = useState<ILatLng[]>([]);
  const [directions, setDirections] = useState<DirectionsResult>();

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const fetchDirection = () => {
    const length = markers.length;
    if (!length) return;
    const start = markers[0].position;
    const end = markers[length - 1].position;

    if (start && end) {
      const waypoints = markers.map(({ position }) => {
        return {
          location: `${position.lat},${position.lng}`,
          stopover: false,
        };
      });
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: start,
          destination: end,
          waypoints,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
          if (status === 'OK' && response) {
            setDirections(response);
          }
        }
      );
    }
  };

  const getPosition = (latLng: LatLng | null) => {
    if (latLng) {
      return { position: { lat: latLng!.lat(), lng: latLng!.lng() } };
    }
    return null;
  };

  const onSetMarker = (e: MapMouseEvent) => {
    const position = getPosition(e.latLng);
    if (position) {
      setMarkers((prev) => [...prev, { ...position, id: nanoid() }]);
    }
  };

  const moveMarker = (e: MapMouseEvent, id: string) => {
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
  };

  useEffect(() => {
    if (markers.length > 1) {
      fetchDirection();
    }
  }, [markers]);

  return (
    <div className={style.container}>
      <div className={style.controls}>
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className={style.map}>
        <GoogleMap
          mapContainerClassName={style.mapContainer}
          options={mapOptions}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onClick={onSetMarker}
        >
          {directions && <DirectionsRenderer directions={directions} options={directionOptions} />}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              draggable={true}
              onMouseUp={(e) => moveMarker(e, marker.id)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};
