// @ts-ignore
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IAllDialect } from '../../../app.interface';
import { useCreateDialect } from '../../../hooks/useCreateDialect';
import { TextArea, TextField } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import ButtonUI from '../../../components/ui/button/Button';
import { regions } from './region.data';
import SelectDialect from '../../../components/ui/select/SelectDialect';
import { zone } from '../../../components/screen/search/searchForm/zone.data';

const clearData = {
  title: '',
  kzMeaning: '',
  enMeaning: '',
  ruMeaning: '',
  region: [],
  hide: false,
  zone: [],
};

const AddDialect = () => {
  const { t } = useTranslation('translation');

  const [dialectData, setDialectData] = useState<IAllDialect>(clearData);
  const [currentRegions, setCurrentRegions] = useState(['']);
  const [currentZones, setCurrentZones] = useState(['']);

  const { mutate } = useCreateDialect(clearData, setDialectData);

  useEffect(() => {
    setDialectData((prev) => ({ ...prev, region: currentRegions }));
  }, [currentRegions]);

  useEffect(() => {
    setDialectData((prev) => ({ ...prev, zone: currentZones }));
  }, [currentZones]);

  const addDialectHandler = async (e: any) => {
    e.preventDefault();
    mutate(dialectData);
    window.location.reload();
  };

  return (
    <div
      className='h-fit flex items-center justify-center'
      style={{ scrollSnapAlign: 'center' }}
    >
      <motion.form
        onSubmit={addDialectHandler}
        className='flex flex-col bg-white dark:bg-transparent px-12 py-5 rounded-lg'
      >
        <div className='flex flex-col gap-5'>
          <div className='w-full flex items-start justify-between gap-10'>
            <div>
              <h2 className='mb-2'>{t('control.add.title')}</h2>
              <TextField.Input
                color='indigo'
                style={{
                  width: 300,
                  padding: '20px 2px',
                }}
                variant='soft'
                value={dialectData.title}
                onChange={(e) =>
                  setDialectData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder='қаз...'
                required={true}
                minLength={2}
              />
            </div>
            <div>
              <h2 className='mb-2'>{t('control.add.region')}</h2>
              <div className='flex items-center justify-between gap-10'>
                <SelectDialect
                  array={regions}
                  currentValue={currentRegions}
                  setCurrentValue={setCurrentRegions}
                />
              </div>
            </div>
            <div>
              <h2 className='mb-2'>{t('control.add.zone')}</h2>
              <SelectDialect
                array={zone}
                currentValue={currentZones}
                setCurrentValue={setCurrentZones}
              />
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
                value={dialectData.kzMeaning}
                onChange={(e) =>
                  setDialectData((prev) => ({
                    ...prev,
                    kzMeaning: e.target.value,
                  }))
                }
                required={true}
                minLength={2}
                placeholder='қаз...'
              />
              <TextArea
                color='indigo'
                style={{
                  width: 300,
                }}
                variant='soft'
                value={dialectData.enMeaning}
                onChange={(e) =>
                  setDialectData((prev) => ({
                    ...prev,
                    enMeaning: e.target.value,
                  }))
                }
                minLength={2}
                required={true}
                placeholder='eng...'
              />
              <TextArea
                color='indigo'
                style={{
                  width: 300,
                }}
                variant='soft'
                value={dialectData.ruMeaning}
                onChange={(e) =>
                  setDialectData((prev) => ({
                    ...prev,
                    ruMeaning: e.target.value,
                  }))
                }
                minLength={2}
                required={true}
                placeholder='рус...'
              />
            </div>
          </div>
          <div className='w-full flex items-center justify-center'>
            <ButtonUI
              title={t('control.add.button')}
              type='submit'
              onClick={() => {}}
            />
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default AddDialect;
