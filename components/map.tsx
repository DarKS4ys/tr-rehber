import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Coordinates } from './destination';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

function GoogleMaps({ coordinates }: { coordinates: Coordinates | null }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map: any) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(coordinates);
      map?.fitBounds(bounds);

      setMap(map);
    },
    [coordinates]
  );

  const onUnmount = React.useCallback(function callback(
    map: google.maps.Map | null
  ) {
    setMap(null);
  },
  []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates!}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={coordinates!} />
      {/* google maps integrate button */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMaps);
