import React, {useEffect, useState} from 'react';
import {Image, Text, ToastAndroid, View} from 'react-native';

import {useProfileNavigation} from '../../../hooks/useNavigationHooks';

import MainButton from '../../../components/atoms/Button/MainButton';
import SubButton from '../../../components/atoms/Button/SubButton';
import CenteredModal from '../../../components/atoms/CenterModal';
import LinedTextInput from '../../../components/atoms/Button/LinedTextInput';
import {deleteMember} from '../../../services/profileService';

import {IC_COMPLETE} from '../../../constants/icons';

import * as S from './styles';
import EncryptedStorage from 'react-native-encrypted-storage';
import resetAllStores from '../../../utils/resetAllStores';
import {useGlobalStore} from '../../../stores/globalStore';

const DeleteAccountScreen = () => {
  const profileNavigation = useProfileNavigation();
  const [firstModalVisible, setFirstModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [matchingText, setMatchingText] = useState(false);
  const contentTexts = [
    '본 서비스를 탈퇴하시면 더이상 ‘베이비 스팟’ 서비스를 이용하실 수 없습니다.',
    '삭제된 정보는 다시 복구할 수 없습니다.',
    '탈퇴 후 기존 회원 정보로 로그인 할 수 없습니다.',
    '탈퇴 처리된 계정은 재 가입 방지를 위해 90일간 보존된 후 삭제 처리됩니다.',
    '작성하신 리뷰 정보는 탈퇴 후에도 삭제되지 않습니다',
  ];

  const handleOpenFirst = () => {
    setFirstModalVisible(true);
  };

  const handleFirstConfirm = async () => {
    setFirstModalVisible(false);

    try {
      await deleteMember();

      EncryptedStorage.clear();
      setSecondModalVisible(true);
    } catch (error) {
      ToastAndroid.show(
        '회원탈퇴 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
        500,
      );
    }
  };

  const handleFirstCancel = () => {
    setFirstModalVisible(false);
  };

  const handleSecondConfirm = () => {
    resetAllStores();

    setSecondModalVisible(false);
  };

  const handleSecondCancel = () => {
    setSecondModalVisible(false);
  };

  useEffect(() => {
    if (text === '탈퇴처리에 동의합니다.') {
      setMatchingText(true);
    } else {
      setMatchingText(false);
    }
  }, [text]);

  return (
    <S.BackGround>
      <S.DeleteAccountContainer>
        <S.DeleteAccountTitle>탈퇴 약관</S.DeleteAccountTitle>

        {contentTexts.map((item, idx) => (
          <S.ContentContainer key={idx}>
            <S.ContentsNumber>{idx + 1}. </S.ContentsNumber>
            <S.Contents>{item}</S.Contents>
          </S.ContentContainer>
        ))}
        <S.ButtonWrapper>
          <SubButton
            text="탈퇴하기"
            onPress={() => {
              setMatchingText(false);
              handleOpenFirst();
            }}
          />
          <MainButton
            text="취소하기"
            onPress={() => profileNavigation.navigate('ProfileMain')}
          />
        </S.ButtonWrapper>
      </S.DeleteAccountContainer>
      <CenteredModal
        visible={firstModalVisible}
        title={'데이터가 남습니다.\n동의하십니까?'}
        onCancel={handleFirstCancel}
        onConfirm={handleFirstConfirm}
        cancelText={'취소하기'}
        confirmText={'탈퇴하기'}
        confirmDisabled={!matchingText}>
        <View>
          <Text>탈퇴처리 진행을 원하시는 경우, 아래에</Text>
          <Text>“탈퇴처리에 동의합니다.”</Text>
          <Text>라는 문구를 입력한 뒤, 탈퇴하기 버튼을 클릭해</Text>
          <Text>주세요.</Text>
          <LinedTextInput
            text={text}
            placeholder="탈퇴처리에 동의합니다."
            setText={setText}
          />
        </View>
      </CenteredModal>

      <CenteredModal
        visible={secondModalVisible}
        title={'탈퇴가 완료되었습니다.'}
        onCancel={handleSecondCancel}
        onConfirm={handleSecondConfirm}
        confirmText={'처음 화면으로'}
        topImage={
          <Image source={IC_COMPLETE} style={{width: 50, height: 50}} />
        }
      />
    </S.BackGround>
  );
};

export default DeleteAccountScreen;
