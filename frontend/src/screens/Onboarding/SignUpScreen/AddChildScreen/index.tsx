import React, {useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import EncryptedStorage from 'react-native-encrypted-storage';

import {useOnboardingNavigation} from '../../../../hooks/useNavigationHooks';
import {useOnboardingStore} from '../../../../stores/onboardingStore';
import {useGlobalStore} from '../../../../stores/globalStore';

import MainButton from '../../../../components/atoms/Button/MainButton';
import ChildrenInfromationButton from './ChildrenInfromationButton';
import AddChildrenButton from './AddChildrenButton';
import CenteredModal from '../../../../components/atoms/CenterModal';
import {
  postImgPresignedUrl,
  signUp,
} from '../../../../services/onboardingService';

import uploadImageToS3 from '../../../../utils/uploadImageToS3';

import * as S from './styles';

interface ChildrenButtonProps {
  year: number;
  count: number;
}

const AddChildScreen = () => {
  const navigation = useOnboardingNavigation();

  const {profileImageName, profileImageType, profileImagePath} =
    useOnboardingStore();

  const [childrens, setChildrens] = useState<ChildrenButtonProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const totalChildrenCount = childrens.reduce(
    (sum, child) => sum + child.count,
    0,
  );

  const handleMinus = (index: number) => {
    setChildrens(prev => {
      const target = prev[index];
      if (target.count <= 1) {
        return prev.filter((_, i) => i !== index);
      } else {
        return prev.map((child, i) =>
          i === index ? {...child, count: child.count - 1} : child,
        );
      }
    });
  };

  const handlePlus = (index: number) => {
    if (totalChildrenCount >= 10) {
      Alert.alert('최대 10명까지만 입력할 수 있습니다.');
      return;
    }
    setChildrens(prev =>
      prev.map((child, i) =>
        i === index ? {...child, count: child.count + 1} : child,
      ),
    );
  };

  const handleAddChild = () => {
    if (totalChildrenCount >= 10) {
      Alert.alert('최대 10명까지만 입력할 수 있습니다.');
      return;
    }
    setSelectedYear(new Date().getFullYear());
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setChildrens(prev => {
      const existingIndex = prev.findIndex(
        child => child.year === selectedYear,
      );

      if (existingIndex !== -1) {
        return prev.map((child, i) =>
          i === existingIndex ? {...child, count: child.count + 1} : child,
        );
      } else {
        return [...prev, {year: selectedYear, count: 1}];
      }
    });

    setModalVisible(false);
  };

  const handleSignUp = async () => {
    let childrenArray: number[] = [];

    childrens
      .sort((a, b) => b.year - a.year)
      .map(item => {
        for (let i = 0; i < item.count; i++) {
          childrenArray.push(item.year);
        }
      });
    useOnboardingStore.getState().setChildBirthYears(childrenArray);

    const tempToken = useOnboardingStore.getState().tempToken;
    const nickname = useOnboardingStore.getState().nickname;
    const childBirthYears = useOnboardingStore.getState().childBirthYears;

    try {
      if (
        nickname != null &&
        profileImageName != null &&
        childBirthYears?.length != 0 &&
        childBirthYears != null &&
        tempToken != null
      ) {
        const response = await signUp({
          params: {
            nickname,
            profileImgUrl: profileImageName,
            birthYears: childBirthYears,
          },
          tempToken,
        });

        if (response.accessToken != null) {
          useGlobalStore.getState().setAccessToken(response.accessToken);
          await EncryptedStorage.setItem('refreshToken', response.refreshToken);

          // pre-signed url 요청
          const preSignedUrlData = await postImgPresignedUrl({
            profileName: profileImageName || '',
            contentType: profileImageType || '',
          });

          const {profileImgPreSignedUrl} = preSignedUrlData;

          // S3 업로드
          await uploadImageToS3({
            imageType: profileImageType,
            imagePath: profileImagePath,
            preSignedUrl: profileImgPreSignedUrl,
          });

          navigation.navigate('SignUpComplete');
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <>
      <S.SignUpScreenView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <S.SingUpInputSection>
            <S.SignUpInputSectionTitle>
              {'자녀 정보를 입력해주세요.'}
            </S.SignUpInputSectionTitle>

            <View>
              <S.AddChildrenSectionTitle>자녀 정보</S.AddChildrenSectionTitle>
              <S.ChildrenInformationSection>
                {[...childrens]
                  .sort((a, b) => b.year - a.year)
                  .map((item, index) => (
                    <ChildrenInfromationButton
                      key={`${item.year}-${index}`}
                      year={item.year}
                      currentCount={item.count}
                      onMinusPressed={() => handleMinus(index)}
                      onPlusPressed={() => handlePlus(index)}
                    />
                  ))}

                <View style={{marginBottom: 30}}>
                  <AddChildrenButton onPressed={handleAddChild} />
                </View>
              </S.ChildrenInformationSection>
            </View>
          </S.SingUpInputSection>
        </ScrollView>

        <MainButton text={'다음'} onPress={handleSignUp} />
      </S.SignUpScreenView>

      <CenteredModal
        visible={modalVisible}
        title="태어난 년도를 선택해주세요"
        onCancel={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        cancelText={'취소'}
        confirmText={'확인'}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={setSelectedYear}
          style={{width: '100%'}}>
          {Array.from({length: 7}, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <Picker.Item key={year} label={`${year}년생`} value={year} />
            );
          })}
        </Picker>
      </CenteredModal>
    </>
  );
};

export default AddChildScreen;
