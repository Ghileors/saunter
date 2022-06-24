import React, { FC } from 'react';
import { DirectionsLeg } from '../../types/google';

interface DirectionProps {
  leg: DirectionsLeg;
}

export const Distance: FC<DirectionProps> = ({ leg }) => {
  if (!leg.distance || !leg.duration) return null;

  const duration = leg.duration;
  const distance = leg.distance;

  return (
    <div>
      <p>{distance.text}</p>
      <p>{duration.text}</p>
    </div>
  );
};
