import React from 'react';
import Postcode from '@actbase/react-daum-postcode';
import {useMapNavigation} from '../../../../hooks/useNavigationHooks';
import {useMapStore} from '../../../../stores/mapStore';

const KakaoPostcodeScreen = () => {
  const navigation = useMapNavigation();
  const setSelectedAddress = useMapStore(state => state.setSelectedAddress);

  return (
    <Postcode
      style={{flex: 1}}
      jsOptions={{animation: true}}
      onSelected={data => {
        const address = data.roadAddress || data.address;

        setSelectedAddress(data);
        navigation.navigate('MapMain', {address});
      }}
      onError={error => {
        console.error(error);
      }}
    />
  );
};

export default KakaoPostcodeScreen;
