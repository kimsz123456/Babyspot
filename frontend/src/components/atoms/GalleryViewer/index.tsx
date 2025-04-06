import React from 'react';
import {Modal} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Gallery from 'react-native-awesome-gallery';

import * as S from './styles';
import {IC_CLOSE} from '../../../constants/icons';

interface GalleryViewerProps {
  visible: boolean;
  images: {uri: string}[];
  initialIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  currentIndex: number;
}

const GalleryViewer = ({
  visible,
  images,
  initialIndex,
  onClose,
  onIndexChange,
  currentIndex,
}: GalleryViewerProps) => {
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <GestureHandlerRootView style={{flex: 1, backgroundColor: 'black'}}>
        <S.GalleryHeader>
          <S.CloseButton onPress={onClose}>
            <S.CloseIconImage source={IC_CLOSE} />
          </S.CloseButton>
          <S.IndexText>
            {currentIndex + 1} / {images.length}
          </S.IndexText>
        </S.GalleryHeader>

        <Gallery
          data={images}
          initialIndex={initialIndex}
          onIndexChange={onIndexChange}
          onSwipeToClose={onClose}
          numToRender={images.length}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
          renderItem={({item}) => (
            <S.FullscreenImage source={{uri: item.uri}} resizeMode="contain" />
          )}
        />
      </GestureHandlerRootView>
    </Modal>
  );
};

export default GalleryViewer;
