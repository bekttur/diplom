// @ts-ignore
import { useTranslation } from 'react-i18next';
import ButtonUI from '../../../ui/button/Button';
import { HandHeart, UserRoundCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { variants } from '../../../ui/variants/variants';

const Advantages = () => {
  const { t } = useTranslation('translation');

  return (
    <div
      className='w-full h-screen flex items-center justify-center'
      style={{ scrollSnapAlign: 'center', overflowX: 'hidden' }}
    >
      <div className='w-1/2 flex flex-col items-center justify-center p-28'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-6xl'>{t('search.lastBlock.title')}</h1>
          <p>{t('search.lastBlock.description')}</p>

        </div>
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center'>
        <motion.div
          variants={variants}
          initial='initial'
          whileInView='animate'
          className='bg-[#f5f5f5] dark:bg-[#18191B] shadow'
          style={{
            borderRadius: 16,
            backdropFilter: 'blur(11.3px)',
            padding: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: 50,
          }}
        >
          <motion.div variants={variants} className='flex flex-col'>
            <UserRoundCheck width={30} height={30} color='#FFC100' />
            <p className='text-lg'>
              {t('search.lastBlock.advantages.firstTitle')}
            </p>
            <p className='text-sm'>
              {t('search.lastBlock.advantages.firstDescription')}
            </p>
          </motion.div>
          <motion.div variants={variants} className='flex flex-col'>
            <img width={45} src='/other/kz-icon2.svg' />
            <p className='text-lg'>
              {' '}
              {t('search.lastBlock.advantages.secondTitle')}
            </p>
            <p className='text-sm'>
              {' '}
              {t('search.lastBlock.advantages.secondDescription')}
            </p>
          </motion.div>
          <motion.div variants={variants} className='flex flex-col'>
            <HandHeart width={30} height={30} color='#FFC100' />
            <p className='text-lg'>
              {' '}
              {t('search.lastBlock.advantages.thirdTitle')}
            </p>
            <p className='text-sm'>
              {' '}
              {t('search.lastBlock.advantages.thirdDescription')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Advantages;
