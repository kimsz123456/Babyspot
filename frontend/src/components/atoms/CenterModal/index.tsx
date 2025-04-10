import React from 'react';
import {Modal, Pressable} from 'react-native';
import * as S from './styles';
import {IC_CLOSE_BLACK} from '../../../constants/icons';

interface CenteredModalProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  cancelText?: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  topImage?: React.ReactNode;
  hasCloseButton?: boolean;
}

const CenteredModal = ({
  visible,
  title,
  children,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmDisabled = false,
  topImage,
  hasCloseButton,
}: CenteredModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <Pressable style={{flex: 1}} onPress={onCancel}>
        <S.Backdrop>
          <Pressable>
            <S.ModalContainer>
              {topImage && (
                <S.TopImageContainer>{topImage}</S.TopImageContainer>
              )}
              {title && (
                <S.TitleContainer>
                  <S.Title>{title}</S.Title>
                  {hasCloseButton && (
                    <Pressable onPress={onCancel}>
                      <S.CloseButton source={IC_CLOSE_BLACK} />
                    </Pressable>
                  )}
                </S.TitleContainer>
              )}
              <S.Body>{children}</S.Body>
              <S.ButtonRow
                style={{
                  justifyContent: cancelText ? 'space-between' : 'center',
                }}>
                {cancelText && (
                  <S.CancelButton onPress={onCancel}>
                    <S.CancelText>{cancelText}</S.CancelText>
                  </S.CancelButton>
                )}
                <S.SubmitButton onPress={onConfirm} disabled={confirmDisabled}>
                  <S.SubmitText>{confirmText}</S.SubmitText>
                </S.SubmitButton>
              </S.ButtonRow>
            </S.ModalContainer>
          </Pressable>
        </S.Backdrop>
      </Pressable>
    </Modal>
  );
};

export default CenteredModal;
