import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { IMapYandex } from '@types';
import React from 'react';

export const MapYandex: React.FC<IMapYandex> = React.memo((props) => {
  const { zoom = 16, center = [39.951128, 44.545757] } = props;
  const centerArray = Array.isArray(center) ? center : [center];
  const defaultState = {
    center: centerArray,
    zoom: zoom,
  };

  return (
    <YMaps>
      <Map
        defaultState={defaultState}
        width={700}
        height={500}
        modules={['control.ZoomControl', 'control.FullscreenControl']}
      >
        <Placemark geometry={centerArray} />
      </Map>
    </YMaps>
  );
});
MapYandex.displayName = 'MapYandex';
