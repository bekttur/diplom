// @ts-ignore
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { IAllDialect } from '../../../app.interface';
import { useCreateDialect } from '../../../hooks/useCreateDialect';
import { TextArea, TextField } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import ButtonUI from '../../../components/ui/button/Button';

const clearData = {
  title: '',
  kzMeaning: '',
  enMeaning: '',
  ruMeaning: '',
  kzRegion: '',
  enRegion: '',
  ruRegion: '',
  hide: false,
  zone: '',
};

const AddDialect = () => {
  const { t } = useTranslation('translation');

  const [dialectData, setDialectData] = useState<IAllDialect>(clearData);

  const { mutate } = useCreateDialect(clearData, setDialectData);

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
              <h2 className='mb-2'>{t('control.add.zone')}</h2>
              <TextField.Input
                color='indigo'
                style={{
                  width: 300,
                  padding: '20px 2px',
                }}
                variant='soft'
                value={dialectData.zone}
                onChange={(e) =>
                  setDialectData((prev) => ({ ...prev, zone: e.target.value }))
                }
                placeholder='қаз...'
                required={true}
                minLength={2}
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
          <div>
            <h2 className='mb-2'>{t('control.add.region')}</h2>
            <div className='flex items-center justify-between gap-10'>
              <TextArea
                color='indigo'
                style={{
                  width: 300,
                }}
                variant='soft'
                value={dialectData.kzRegion}
                onChange={(e) =>
                  setDialectData((prev) => ({
                    ...prev,
                    kzRegion: e.target.value,
                  }))
                }
                minLength={2}
                required={true}
                placeholder='қаз...'
              />
              <TextArea
                color='indigo'
                style={{
                  width: 300,
                }}
                variant='soft'
                value={dialectData.enRegion}
                onChange={(e) =>
                  setDialectData((prev) => ({
                    ...prev,
                    enRegion: e.target.value,
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
                value={dialectData.ruRegion}
                onChange={(e) =>
                  setDialectData((prev) => ({
                    ...prev,
                    ruRegion: e.target.value,
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
