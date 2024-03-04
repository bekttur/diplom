import { useState } from 'react';
import { IAllDialect } from '../../../app.interface';
import { useCreateDialect } from '../../../hooks/useCreateDialect';
import { TextArea, TextField } from '@radix-ui/themes';
import Button from '../../../components/ui/button/Button';
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
};

const AddDialect = () => {
  const [dialectData, setDialectData] = useState<IAllDialect>(clearData);

  const { mutate } = useCreateDialect(clearData, setDialectData);

  const addDialectHandler = async (e: any) => {
    e.preventDefault();
    mutate(dialectData);
  };

  return (
    <div
      className='h-screen flex items-center justify-center'
      style={{ scrollSnapAlign: 'center' }}
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={addDialectHandler}
        className='flex flex-col shadow bg-white dark:bg-transparent px-12 py-5 rounded-lg'
      >
        <div className='flex flex-col gap-5'>
          <div className='w-full flex flex-col items-start justify-center'>
            <h2 className='mb-2'>Title: </h2>
            <div>
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
          </div>
          <div>
            <h2 className='mb-2'>Мағынасы:</h2>
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
            <h2 className='mb-2'>Қолданылу аймағы:</h2>
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
            <ButtonUI title='Add' type='submit' onClick={() => {}} />
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default AddDialect;
