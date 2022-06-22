import React, { FC } from 'react';
import { Marker } from '@react-google-maps/api';
import { LatLngInterface } from '../../interfaces/google-interfaces';
import MarkerIcon from '../../assets/marker.png';

interface MarkerProps {
  position: LatLngInterface;
}

export const CurrentLocationMarker: FC<MarkerProps> = ({ position }) => {
  return <Marker position={position} icon={MarkerIcon} />;
};
