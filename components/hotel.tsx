'use client';
import { Hotel } from '@/schemas/ai';
import React from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

export default function Hotel({
  hotel,
  coordinates,
}: {
  hotel: Hotel;
  coordinates: Coordinates | null;
}) {
  return (
    <div>
      <p>{hotel.name}</p>
      <p>{coordinates?.lat} {coordinates?.lng}</p>
    </div>
  );
}
