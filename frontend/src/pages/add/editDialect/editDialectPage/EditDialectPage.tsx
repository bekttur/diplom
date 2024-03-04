import { TextArea, TextField } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import Button from '../../../../components/ui/button/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDialects } from '../../../../hooks/useDialects';
import { IAllDialect } from '../../../../app.interface';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { DialectService } from '../../../../services/dialect.service';
import ButtonUI from '../../../../components/ui/button/Button';

const EditDialectPage = () => {
  const { id } = useParams();
  const { data } = useDialects();
  const navigate = useNavigate();

  const [dialectData, setDialectData] = useState<IAllDialect | null>(null);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setDialectData(data.find((elem: IAllDialect) => elem._id === id));
    }
  }, [id, data]);

  console.log(dialectData);

  const updateData = () => {
    try {
      if (!dialectData) {
        throw new Error('Dialect data is null');
      }
      DialectService.updateDialect(dialectData)
      toast.success('Успешно обновлено!');
      navigate('/add/dialect');
    } catch (error) {
      toast.error('Ошибка при обновлении');
    }
  };

  return (
    <div className='h-screen flex flex-col items-start justify-center gap-5' style={{scrollSnapAlign: 'center'}}>
      <div onClick={() => navigate('/add/dialect')} className='flex gap-2 text-[#39718D] cursor-pointer'>
        <ArrowLeft width={16} /> <span>Назад</span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='flex flex-col shadow bg-white dark:bg-transparent px-12 py-5'
      >
        {!!dialectData && (
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
            </div>
            <div>
              <h2 className='mb-2'>Мағынасы:</h2>
              <div className='flex items-center justify-between gap-10'>
                <TextArea
                  color='indigo'
                  style={{
                    width: 300
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
                    width: 300
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
                    width: 300
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
              <h2 className='mb-2'>Қолданылу аймағы:</h2>
              <div className='flex items-center justify-between gap-10'>
                <TextArea
                  color='indigo'
                  style={{
                    width: 300
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
                    width: 300
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
                    width: 300
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
              <ButtonUI title='Save' type='submit' onClick={updateData} />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EditDialectPage;
