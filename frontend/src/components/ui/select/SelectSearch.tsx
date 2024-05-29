import React from 'react';
import Select from 'react-select';
import { zone } from '../../screen/search/searchForm/zone.data';
// @ts-ignore
import { useTranslation } from 'react-i18next';

interface SelectOptionProps {
  currentRegion: string[];
  setCurrentRegion: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  currentRegion,
  setCurrentRegion,
}) => {
  const { t } = useTranslation('translation'); 

  const getValue = () => {
    return zone.find((c) => c.value === currentRegion[0])
  };

  const translatedOptions = zone.map(option => ({
    ...option,
    label: t(option.label) 
  }));

  const onChange = (newValue: any) => {
    setCurrentRegion(newValue.value);
  };

  return (
    <Select
      classNamePrefix='custom-select'
      onChange={onChange}
      value={getValue()}
      options={translatedOptions} 
      placeholder={t('search.placeholder')} 
    />
  );
};

export default SelectOption;
