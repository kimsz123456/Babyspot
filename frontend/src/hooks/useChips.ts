import {useRef, useState} from 'react';

const mockChips: ChipProps[] = [
  {label: '유아 의자', isSelected: false},
  {label: '유아 식기', isSelected: false},
  {label: '기저귀 교환대', isSelected: false},
  {label: '수유실', isSelected: false},
  {label: '놀이터', isSelected: false},
];

interface ChipProps {
  label: string;
  isSelected: boolean;
}

const useChips = () => {
  const initialChips = useRef<ChipProps[]>(mockChips);
  const [chips, setChips] = useState<ChipProps[]>(mockChips);

  const handleChipPressed = (selectedIndex: number) => {
    setChips(prev => {
      const updated = prev.map((chip, index) =>
        index === selectedIndex
          ? {...chip, isSelected: !chip.isSelected}
          : chip,
      );

      const selected = updated.filter(chip => chip.isSelected);
      const unselected = initialChips.current.filter(
        initialChip =>
          !updated.find(chip => chip.label === initialChip.label)?.isSelected,
      );

      return [...selected, ...unselected];
    });
  };

  return {
    chips,
    handleChipPressed,
  };
};

export default useChips;
