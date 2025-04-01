import React, {useEffect, useState} from 'react';
import * as S from './styles';
import AddChildrenButton from '../../../../Onboarding/SignUpScreen/AddChildScreen/AddChildrenButton';
import CenteredModal from '../../../../../components/atoms/CenterModal';
import {Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ChildrenInfromationButton from '../../../../Onboarding/SignUpScreen/AddChildScreen/ChildrenInfromationButton';
import {
  getMemberProfile,
  MemberProfile,
} from '../../../../../services/profileService';

interface ChildrenButtonProps {
  year: number;
  count: number;
}

const ChildAge = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [children, setChildren] = useState<ChildrenButtonProps[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const aggregateBabyBirthYears = (years: number[]): ChildrenButtonProps[] => {
    const map = new Map<number, number>();
    years.forEach(year => {
      map.set(year, (map.get(year) || 0) + 1);
    });
    return Array.from(map, ([year, count]) => ({year, count})).sort(
      (a, b) => b.year - a.year,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile: MemberProfile = await getMemberProfile();
        if (profile.babyBirthYears && profile.babyBirthYears.length > 0) {
          setChildren(aggregateBabyBirthYears(profile.babyBirthYears));
        }
      } catch (error) {
        console.error('프로필 조회 오류:', error);
      }
    };

    fetchData();
  }, []);

  const totalChildrenCount = children.reduce(
    (sum, child) => sum + child.count,
    0,
  );

  const handleMinus = (index: number) => {
    setChildren(prev => {
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
    setChildren(prev =>
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
    setChildren(prev => {
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

  return (
    <S.ChildAgeWrapper>
      <S.ChildTitle>자녀 정보</S.ChildTitle>
      <S.ChildAgesContainer>
        {[...children]
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
      </S.ChildAgesContainer>
      <S.AgeCountContainer>
        <AddChildrenButton onPressed={handleAddChild} />
      </S.AgeCountContainer>
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
    </S.ChildAgeWrapper>
  );
};

export default ChildAge;
