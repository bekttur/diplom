import { motion } from 'framer-motion';
import { variants } from '../../../ui/variants/variants';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const Steps = () => {
	const { t } = useTranslation('translation');
	return (
		<div className='w-full h-[80vh] flex items-center justify-between' style={{ scrollSnapAlign: 'center', overflowX: 'hidden' }}>
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
                src='/other/questionMark.svg'
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
            <div className='grid grid-cols-2 gap-20 bg-[#EDEDED] dark:bg-[#18191B] p-40'>
              <motion.div variants={variants}>
                <p className='text-xl dark:text-[#FFC100] text-[#00749E]'>
                  {t('search.defaultBlock.steps.firstTitle')}
                </p>
                <p className='text-sm'>
                  {' '}
                  {t('search.defaultBlock.steps.firstDescription')}
                </p>
              </motion.div>
              <motion.div variants={variants}>
                <p className='text-xl dark:text-[#FFC100] text-[#00749E]'>
                  {' '}
                  {t('search.defaultBlock.steps.secondTitle')}
                </p>
                <p className='text-sm'>
                  {t('search.defaultBlock.steps.secondDescription')}
                </p>
              </motion.div>
              <motion.div variants={variants}>
                <p className='text-xl dark:text-[#FFC100] text-[#00749E]'>
                  {' '}
                  {t('search.defaultBlock.steps.thirdTitle')}
                </p>
                <p className='text-sm'>
                  {t('search.defaultBlock.steps.thirdDescription')}
                </p>
              </motion.div>
              <motion.div variants={variants}>
                <p className='text-xl dark:text-[#FFC100] text-[#00749E]'>
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
	)
}

export default Steps