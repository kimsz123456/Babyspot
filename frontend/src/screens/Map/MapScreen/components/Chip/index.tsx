import React from 'react';

import * as S from './styles';

interface ChipProps {
  label: string;
  isSelected?: boolean;
  onPressed: () => void;
}

const Chip = ({label, isSelected, onPressed}: ChipProps) => {
  return (
    <S.Chip $isSelected={isSelected} onPress={onPressed}>
      <S.ChipText $isSelected={isSelected}>{label}</S.ChipText>
    </S.Chip>
  );
};

export default Chip;
