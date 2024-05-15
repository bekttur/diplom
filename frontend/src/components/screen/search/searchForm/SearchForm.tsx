import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISearch, ISearchForm } from '../../../../app.interface';
import SelectOption from '../../../ui/select/SelectSearch';
import Loading from '../../../ui/loading/Loading';
import { Button, TextField } from '@radix-ui/themes';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const SearchForm: React.FC<ISearchForm> = ({
  handleDialect,
  setHandleDialect,
  resultRef,
  currentRegion,
  setCurrentRegion,
}) => {
  const { t } = useTranslation('translation');
  const { register, handleSubmit } = useForm<ISearch>();
  const [showLoading, setShowLoading] = useState(false);

  const onSubmit: SubmitHandler<ISearch> = (data) => {
    setShowLoading(true);
    setHandleDialect(data.search);
    setTimeout(() => setShowLoading(false), 800);
  };

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [handleDialect]);

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='h-[120px] flex items-center justify-center gap-1'
        >
          <TextField.Input
            {...register('search')}
            style={{ width: 400 }}
            type='text'
            size='3'
            autoComplete='off'
          />
          <SelectOption
            currentRegion={currentRegion}
            setCurrentRegion={setCurrentRegion}
          />

          <Button
            color='amber'
            size='3'
            style={{ color: '#fff' }}
            className='w-1/5'
          >
            {t('search.button')}
          </Button>
        </form>
      </div>
      {showLoading ? <Loading /> : null}
    </>
  );
};

export default SearchForm;
