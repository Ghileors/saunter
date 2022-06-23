import React, { FC } from 'react';
import { Marker } from '@react-google-maps/api';
import MarkerIcon from '../../assets/marker.png';
import { LatLngLiteral } from '../../types/google-types';

interface MarkerProps {
  position: LatLngLiteral;
}

export const CurrentLocationMarker: FC<MarkerProps> = ({ position }) => {
  return <Marker position={position} icon={MarkerIcon} />;
};
