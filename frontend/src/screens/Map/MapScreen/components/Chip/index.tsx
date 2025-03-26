import React from 'react';

import * as S from './styles';

interface ChipProps {
  label: string;
}

const Chip = ({label}: ChipProps) => {
  return (
    <S.Chip>
      <S.ChipText>{label}</S.ChipText>
    </S.Chip>
  );
};

export default Chip;
