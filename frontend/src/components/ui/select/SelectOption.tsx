import React from 'react';
import Select from 'react-select';
import { options } from '../../screen/search/searchForm/option.data';

interface SelectOptionProps {
  currentRegion: string[];
  setCurrentRegion: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectOption: React.FC<SelectOptionProps> = ({ currentRegion, setCurrentRegion }) => {
	const getValue = () => {
		return currentRegion.length > 0 ? options.find(c => c.value === currentRegion[0]) : '';
	}
	

	const onChange = (newValue: any) => {
		setCurrentRegion(newValue.value)
	}

	console.log(currentRegion);
	

	return (
			<Select
				classNamePrefix='custom-select'
				onChange={onChange}
				value={getValue()}
				options={options}
				placeholder='өңірлер...'
			/>
	)
};

export default SelectOption;
