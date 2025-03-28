import React, {useState} from 'react';
import * as S from './styles';
import MainButton from '../../../components/atoms/Button/MainButton';
import SubButton from '../../../components/atoms/Button/SubButton';
import {useNavigation} from '@react-navigation/native';
import CenteredModal from '../../../components/atoms/CenterModal';
import {Image, Text, View} from 'react-native';
import LinedTextInput from '../../../components/atoms/Button/LinedTextInput';
import {IC_COMPLETE} from '../../../constants/icons';
import scale from '../../../utils/scale';

const DeleteAccountScreen = () => {
  const navigation = useNavigation();
  const [firstModalVisible, setFirstModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
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

  const handleFirstConfirm = () => {
    setFirstModalVisible(false);
    setSecondModalVisible(true);
  };

  const handleFirstCancel = () => {
    setFirstModalVisible(false);
  };

  const handleSecondConfirm = () => {
    setSecondModalVisible(false);
  };

  const handleSecondCancel = () => {
    setSecondModalVisible(false);
  };

  return (
    <S.BackGround>
      <S.DeleteAccountContainer>
        <S.DeleteAccountTitle>탈퇴 약관</S.DeleteAccountTitle>

        {contentTexts.map((item, idx) => (
          <S.ContentContainer>
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
            onPress={() => navigation.navigate('ProfileMain')}
          />
        </S.ButtonWrapper>
      </S.DeleteAccountContainer>
      <CenteredModal
        visible={firstModalVisible}
        title={`데이터가 남습니다.\n동의하십니까?`}
        onCancel={handleFirstCancel}
        onConfirm={handleFirstConfirm}
        cancelText={'취소하기'}
        confirmText={'탈퇴하기'}
        confirmDisabled={!matchingText}>
        <View>
          <Text>탈퇴처리 진행을 원하시는 경우, 아래에</Text>
          <Text>“탈퇴처리에 동의합니다”</Text>
          <Text>라는 문구를 입력한 뒤, 탈퇴하기 버튼을 클릭해</Text>
          <Text>주세요.</Text>
          <LinedTextInput
            placeholder="탈퇴처리에 동의합니다."
            textEditted={(text: string) => {
              if (text === '탈퇴처리에 동의합니다.') {
                setMatchingText(true);
              } else {
                setMatchingText(false);
              }
            }}
          />
        </View>
      </CenteredModal>

      <CenteredModal
        visible={secondModalVisible}
        title={`탈퇴가 완료되었습니다.`}
        onCancel={handleSecondCancel}
        onConfirm={handleSecondConfirm}
        confirmText={'처음 화면으로'}
        topImage={
          <Image source={IC_COMPLETE} style={{width: 50, height: 50}} />
        }></CenteredModal>
    </S.BackGround>
  );
};

export default DeleteAccountScreen;
