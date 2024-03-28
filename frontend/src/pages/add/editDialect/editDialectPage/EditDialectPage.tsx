// @ts-ignore
import { useTranslation } from 'react-i18next';
import { Dialog, TextArea, TextField } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IAllDialect } from '../../../../app.interface';
import toast from 'react-hot-toast';
import { DialectService } from '../../../../services/dialect.service';
import ButtonUI from '../../../../components/ui/button/Button';

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

  console.log(dialectData);

  const updateData = () => {
    try {
      if (!dialectData) {
        throw new Error('Dialect data is null');
      }
      DialectService.updateDialect(dialectData);
      toast.success('Успешно обновлено!');
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
                <h2 className='mb-2'>{t('control.add.zone')}</h2>
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
                  value={dialectData.zone}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      zone: e.target.value,
                    }));
                  }}
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
            <div>
              <h2 className='mb-2'>{t('control.add.region')}</h2>
              <div className='flex items-center justify-between gap-10'>
                <TextArea
                  color='indigo'
                  style={{
                    width: 300,
                  }}
                  variant='soft'
                  minLength={2}
                  required={true}
                  placeholder='қаз...'
                  value={dialectData.kzRegion}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      kzRegion: e.target.value,
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
                  value={dialectData.enRegion}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      enRegion: e.target.value,
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
                  value={dialectData.ruRegion}
                  onChange={(e) => {
                    setDialectData((prev: IAllDialect | null) => ({
                      ...(prev as IAllDialect),
                      ruRegion: e.target.value,
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
