import {useEffect, useRef, useState} from 'react';

import {useMapStore} from '../stores/mapStore';

interface ChipType {
  label: string;
  value: string;
  isSelected: boolean;
}

const chipList: ChipType[] = [
  {label: '유아 식기', value: 'babyTableware', isSelected: false},
  {label: '유아 의자', value: 'babyChair', isSelected: false},
  {label: '6인 이상 테이블', value: 'groupTable', isSelected: false},
  {label: '놀이방', value: 'playZone', isSelected: false},
  {label: '수유실', value: 'nursingRoom', isSelected: false},
];

const useChips = () => {
  const initialChips = useRef<ChipType[]>(chipList);
  const [chips, setChips] = useState<ChipType[]>(chipList);

  const {selectedChips, setSelectedChips} = useMapStore();

  const handleChipPressed = (selectedIndex: number) => {
    const updated = chips.map((chip, index) =>
      index === selectedIndex ? {...chip, isSelected: !chip.isSelected} : chip,
    );

    const selected = updated.filter(chip => chip.isSelected);

    setChips(updated);

    const selectedChipList = selected.map(chip => chip.value);
    setSelectedChips(selectedChipList);
  };

  useEffect(() => {
    if (selectedChips.length > 0) {
      return;
    }

    setChips(initialChips.current.map(chip => ({...chip, isSelected: false})));
  }, [selectedChips]);

  return {
    chips,
    handleChipPressed,
  };
};

export default useChips;
