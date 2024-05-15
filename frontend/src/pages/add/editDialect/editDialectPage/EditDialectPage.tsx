// @ts-ignore
import { useTranslation } from 'react-i18next';
import { Dialog, TextArea, TextField } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAllDialect, IOption } from '../../../../app.interface';
import toast from 'react-hot-toast';
import { DialectService } from '../../../../services/dialect.service';
import ButtonUI from '../../../../components/ui/button/Button';
import Select, { OnChangeValue } from 'react-select';
import { regions } from '../../addDialect/region.data';
import { zone } from '../../../../components/screen/search/searchForm/zone.data';

const EditDialectPage = ({ dialect }: { dialect: IAllDialect }) => {
  const { t } = useTranslation('translation');

  const { id } = useParams();
  const navigate = useNavigate();

  const [dialectData, setDialectData] = useState<IAllDialect | null>(null);

  useEffect(() => {
    if (dialect) {
      setDialectData(dialect);
    }
  }, [id, dialect]);

  const translatedRegions = regions.map((item) => ({
    ...item,
    label: t(item.label),
  }));

  const translatedZones = zone.map((item) => ({
    ...item,
    label: t(item.label),
  }));

  const getValueRegion = () => {
    if (!!dialectData && !!dialectData.region) {
      return dialectData.region.map((region) => ({
        value: region,
        label: t(`statistic.regions.${region}`),
      }));
    }
    return [];
  };

  const getValueZone = () => {
    if (!!dialectData && !!dialectData.zone) {
      return dialectData.zone.map((item) => ({
        value: item,
        label: t(`search.zone.${item}`),
      }));
    }
    return [];
  };
  

  const onChangeRegion = (newValue: OnChangeValue<IOption, boolean>) => {
    setDialectData((prev: IAllDialect | null) => ({
      ...(prev as IAllDialect),
      region: (newValue as IOption[]).map((v) => v.value),
    }));
  };

  const onChangeZone = (newValue: OnChangeValue<IOption, boolean>) => {
    setDialectData((prev: IAllDialect | null) => ({
      ...(prev as IAllDialect),
      zone: (newValue as IOption[]).map((v) => v.value),
    }));
  };

  const updateData = () => {
    try {
      if (!dialectData) {
        throw new Error('Dialect data is null');
      }
      DialectService.updateDialect(dialectData);
      toast.success('Сәтті жаңартылды!');
      navigate('/add');
    } catch (error) {
      toast.error('Ошибка при обновлении');
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className='h-fit flex flex-col items-start justify-center gap-5'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='flex flex-col bg-white dark:bg-transparent'
      >
        {!!dialectData && (
          <div className='flex flex-col gap-5'>
            <div className='w-full flex items-start justify-between'>
              <div>
                <h2 className='mb-2'>{t('control.add.title')}</h2>
                <TextField.Input
                  color='indigo'
                  style={{
                    width: 300,
                    padding: '20px 2px',
                  }}
                  variant='soft'
                  required={true}
                  minLength={2}
                  placeholder='қаз...'
                  value={dialectData.title}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <h2 className='mb-2'>{t('control.add.region')}</h2>
                <div className='flex items-center justify-between gap-10'>
                  <Select
                    classNamePrefix='custom-dialect-select'
                    onChange={onChangeRegion}
                    options={translatedRegions}
                    defaultValue={getValueRegion()}
                    isMulti
                  />
                </div>
              </div>
              <div>
                <h2 className='mb-2'>{t('control.add.zone')}</h2>
                <div className='flex items-center justify-between gap-10'>
                  <Select
                    classNamePrefix='custom-dialect-select'
                    onChange={onChangeZone}
                    options={translatedZones}
                    defaultValue={getValueZone()}
                    isMulti
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className='mb-2'>{t('control.add.meaning')}</h2>
              <div className='flex items-center justify-between gap-10'>
                <TextArea
                  color='indigo'
                  style={{
                    width: 300,
                  }}
                  variant='soft'
                  required={true}
                  minLength={2}
                  placeholder='қаз...'
                  value={dialectData.kzMeaning}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      kzMeaning: e.target.value,
                    }));
                  }}
                />
                <TextArea
                  color='indigo'
                  style={{
                    width: 300,
                  }}
                  variant='soft'
                  minLength={2}
                  required={true}
                  placeholder='eng...'
                  value={dialectData.enMeaning}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      enMeaning: e.target.value,
                    }));
                  }}
                />
                <TextArea
                  color='indigo'
                  style={{
                    width: 300,
                  }}
                  variant='soft'
                  minLength={2}
                  required={true}
                  placeholder='рус...'
                  value={dialectData.ruMeaning}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      ruMeaning: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className='w-full flex items-center justify-center'>
              <Dialog.Close>
                <ButtonUI
                  title={t('control.edit.button')}
                  type='submit'
                  onClick={updateData}
                />
              </Dialog.Close>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EditDialectPage;
