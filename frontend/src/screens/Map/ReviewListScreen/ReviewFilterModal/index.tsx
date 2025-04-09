import React, {useEffect, useState} from 'react';
import * as S from './styles';
import CenteredModal from '../../../../components/atoms/CenterModal';
import AgeButton from '../../../../components/atoms/AgeButton';
import scale from '../../../../utils/scale';
import showToastMessage from '../../../../utils/showToastMessage';

const MAX_SELECT_COUNT = 3;

const INITIAL_AGES: AgeProps[] = Array.from({length: 7}, (_, index) => ({
  age: index + 1,
  isSelected: false,
}));

interface ReviewFilterModalProps {
  modalOpened: boolean;
  setModalOpened: (value: boolean) => void;
  selectedAge: number[];
  setSelectedAge: (value: number[]) => void;
}

export interface AgeProps {
  age: number;
  isSelected: boolean;
}

const ReviewFilterModal = ({
  modalOpened,
  setModalOpened,
  selectedAge,
  setSelectedAge,
}: ReviewFilterModalProps) => {
  const [ages, setAges] = useState(INITIAL_AGES);

  useEffect(() => {
    if (modalOpened) {
      let tempAges: AgeProps[] = JSON.parse(JSON.stringify(INITIAL_AGES));

      selectedAge.forEach(age => {
        tempAges[age - 1].isSelected = true;
      });

      setAges(tempAges);
    }
  }, [modalOpened]);

  return (
    <CenteredModal
      visible={modalOpened}
      confirmText={'검색하기'}
      onCancel={() => {
        setModalOpened(false);
      }}
      onConfirm={() => {
        let tempAges: number[] = [];

        ages.forEach(age => {
          age.isSelected && tempAges.push(age.age);
        });

        setSelectedAge(tempAges);
        setModalOpened(false);
      }}
      title="리뷰 필터"
      hasCloseButton
      children={
        <S.ReviewFilterModalChildrenContainer>
          <S.BodyTitle>{`아이들 나이를 바탕으로,\n리뷰를 선별해드릴게요.`}</S.BodyTitle>

          <S.IconListContainer
            data={ages}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            contentContainerStyle={{gap: scale(16)}}
            renderItem={({item}) => (
              <AgeButton
                age={item.age}
                isSelected={item.isSelected}
                onPressed={() => {
                  const selectedCount = ages.filter(
                    age => age.isSelected,
                  ).length;

                  if (selectedCount >= MAX_SELECT_COUNT && !item.isSelected) {
                    showToastMessage('최대 3개만 선택 가능합니다.');

                    return;
                  }

                  setAges(prev => {
                    return prev.map(age => {
                      return age.age == item.age
                        ? {...age, isSelected: !age.isSelected}
                        : age;
                    });
                  });
                }}
              />
            )}
          />
        </S.ReviewFilterModalChildrenContainer>
      }
    />
  );
};

export default ReviewFilterModal;
