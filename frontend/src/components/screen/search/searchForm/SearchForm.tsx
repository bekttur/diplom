import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearch, ISearchForm } from '../../../../app.interface';
import SelectOption from '../../../ui/select/SelectOption';
import Loading from '../../../ui/loading/Loading';

const SearchForm: React.FC<ISearchForm> = ({ setHandleDialect }) => {
  const { register, handleSubmit } = useForm<ISearch>();
  const [currentRegion, setCurrentRegion] = useState(['']);
  const [showLoading, setShowLoading] = useState(false);

  const onSubmit: SubmitHandler<ISearch> = (data) => {
    setShowLoading(true);
    setHandleDialect(data.search);
    setTimeout(() => setShowLoading(false), 800);
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex items-center justify-center'
        >
          <input
            className='w-96 border border-gray-600 rounded-none py-2 px-2 bg-transparent text-base my-10 text-[#18181b]'
            {...register('search')}
            type='text'
            autoComplete='off'
          />
          <SelectOption
            currentRegion={currentRegion}
            setCurrentRegion={setCurrentRegion}
          />
          <button
            className='w-1/4 h-100 border border-[#FFC100] text-2xl my-10 bg-[#FFC100] text-white'
            style={{ padding: 4 }}
          >
            Find
          </button>
        </form>
      </div>
      {showLoading ? <Loading /> : null}
    </>
  );
};

export default SearchForm;
