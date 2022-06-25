import React, { FC } from 'react';
import { Marker } from '@react-google-maps/api';
import { LatLngLiteral, MapMouseEvent } from '../../types/google';
import { markerOptions } from '../../configs/map.options';

interface MarkerProps {
  id: string;
  position: LatLngLiteral;
  moveMarker: (e: MapMouseEvent, id: string) => void;
}

export const CustomMarker: FC<MarkerProps> = ({ position, id, moveMarker }) => {
  return (
    <Marker
      position={position}
      draggable
      onMouseUp={(e) => moveMarker(e, id)}
      options={{ ...markerOptions, zIndex: 1 }}
    />
  );
};
