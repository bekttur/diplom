// @ts-ignore
import { useTranslation } from 'react-i18next';
import { IResult } from '../../../../app.interface';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    y: 80,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const Result: React.FC<IResult> = ({ data, handleDialect, currentRegion }) => {
  const { t } = useTranslation('translation');

  return (
    <motion.div
      variants={variants}
      className='flex items-center justify-start'
      style={{ scrollSnapAlign: 'center', overflowX: 'hidden' }}
    >
      {handleDialect ? (
        data &&
        data.map((item, index) => {
          if (
            item.title.toLowerCase() === handleDialect.toLowerCase() &&
            (currentRegion[0] === '' || currentRegion.includes(item.zone))
          ) {
            return (
              <motion.div
                variants={variants}
                initial='initial'
                whileInView='animate'
                className='w-full h-screen flex flex-col items-center justify-around'
              >
                <motion.div variants={variants} className='h-42'></motion.div>
                <motion.div
                  variants={variants}
                  key={index}
                  className='w-[60%] flex flex-col gap-6'
                >
                  <h1 className='text-8xl'>{item.title}.</h1>
                  <div className='flex items-end gap-3'>
                    <p className='text-3xl'>{item.kzMeaning}</p>
                  </div>
                </motion.div>
                <motion.div variants={variants} className='w-[50%]'>
                  <span className='text-gray-500'>Қолданылу аймағы:</span>
                  <p className='text-xl mb-5'>{item.kzRegion}</p>
                  <span className='text-gray-500'>Өңір:</span>
                  <p className='text-xl'>{item.zone} Қазақстан</p>
                </motion.div>
              </motion.div>
            );
          }
        })
      ) : (
        <div className='w-full h-screen flex items-center justify-between'>
          <motion.div
            variants={variants}
            initial='initial'
            whileInView='animate'
            className='w-1/2 flex flex-col items-center justify-center p-28 text-center'
          >
            <motion.div
              variants={variants}
              initial='initial'
              whileInView='animate'
              className='flex flex-col gap-3 items-center '
            >
              <motion.img
                variants={variants}
                width={160}
                src='/questionMark.svg'
              />
              <motion.h1 variants={variants} className='text-4xl'>
                {t('search.defaultBlock.title')}
              </motion.h1>
              <motion.p variants={variants} className='text-lg'>
                {t('search.defaultBlock.description')}
              </motion.p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={variants}
            initial='initial'
            whileInView='animate'
            className='w-1/2 flex flex-col items-center justify-center'
          >
            <div className='grid grid-cols-2 gap-20 bg-[#EDEDED] dark:bg-[#2E2E2E] p-40'>
              <motion.div variants={variants}>
                <p className='text-xl'>
                  {t('search.defaultBlock.steps.firstTitle')}
                </p>
                <p className='text-sm'>
                  {' '}
                  {t('search.defaultBlock.steps.firstDescription')}
                </p>
              </motion.div>
              <motion.div variants={variants}>
                <p className='text-xl'>
                  {' '}
                  {t('search.defaultBlock.steps.secondTitle')}
                </p>
                <p className='text-sm'>
                  {t('search.defaultBlock.steps.secondDescription')}
                </p>
              </motion.div>
              <motion.div variants={variants}>
                <p className='text-xl'>
                  {' '}
                  {t('search.defaultBlock.steps.thirdTitle')}
                </p>
                <p className='text-sm'>
                  {t('search.defaultBlock.steps.thirdDescription')}
                </p>
              </motion.div>
              <motion.div variants={variants}>
                <p className='text-xl'>
                  {' '}
                  {t('search.defaultBlock.steps.fourTitle')}
                </p>
                <p className='text-sm'>
                  {t('search.defaultBlock.steps.fourDescription')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
      {/* <div
          className='flex items-center gap-10 relative bottom-[380px] left-[30px] text-lg'
          style={{ transform: 'rotate(270deg)' }}
        >
          Dialect
          <div className='w-[80px] h-0 mt-[5px] border border-gray-400 dark:border-gray-600'></div>
        </div> */}
    </motion.div>
  );
};

export default Result;
