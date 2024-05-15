// @ts-ignore
import { useTranslation } from 'react-i18next';
import Select, { OnChangeValue } from 'react-select';
import { IOption } from '../../../app.interface';
import React from 'react';

interface ISelectDialect {
  array: IOption[];
  currentValue: string[];
  setCurrentValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectDialect: React.FC<ISelectDialect> = ({
  array,
  currentValue,
  setCurrentValue,
}) => {
  const { t } = useTranslation('translation');

  const translatedRegions = array.map((item) => ({
    ...item,
    label: t(item.label),
  }));

  const getValue = () => {
    return currentValue
      ? translatedRegions.filter((c) => currentValue.indexOf(c.value) >= 0)
      : [];
  };

  const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
    setCurrentValue((newValue as IOption[]).map((v) => v.value));
  };

  console.log(currentValue);

  return (
    <Select
      classNamePrefix='custom-dialect-select'
      onChange={onChange}
      value={getValue()}
      options={translatedRegions}
      isMulti
    />
  );
};

export default SelectDialect;
