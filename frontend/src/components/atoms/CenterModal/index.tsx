import React from 'react';
import {Modal, Pressable} from 'react-native';
import * as S from './styles';

interface CenteredModalProps {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const CenteredModal = ({
  visible,
  title,
  children,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
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
              {title && <S.Title>{title}</S.Title>}
              <S.Body>{children}</S.Body>
              <S.ButtonRow>
                <S.CancelButton onPress={onCancel}>
                  <S.CancelText>{cancelText}</S.CancelText>
                </S.CancelButton>
                <S.SubmitButton onPress={onConfirm}>
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
