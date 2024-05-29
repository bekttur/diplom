// @ts-ignore
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { variants } from '../../../ui/variants/variants';
import { IResult } from '../../../../app.interface';
import './Result.css';

const Result: React.FC<IResult> = ({ data, handleDialect }) => {
  const { t, i18n } = useTranslation('translation');

  const getZoneNames = (zones: string[]): string => {
    return zones.map((zone) => t(`search.zone.${zone}`)).join(', ');
  };

  const getRegionNames = (regions: string[]): string => {
    return regions.map((region) => t(`statistic.regions.${region}`)).join(', ');
  };

  return (
    <motion.div
      variants={variants}
      className='flex items-center justify-start'
      style={{ scrollSnapAlign: 'center', overflowX: 'hidden' }}
    >
      {handleDialect ? (
        data &&
        data.map((item, index) => {
          return (
            <motion.div
              variants={variants}
              initial='initial'
              whileInView='animate'
              className='w-full h-screen flex flex-col items-center justify-around'
              key={index}
            >
              <motion.div variants={variants} className='h-42'></motion.div>
              <motion.div
                variants={variants}
                className='w-[60%] flex flex-col gap-6'
              >
                <h1 className='text-8xl'>{item.title}.</h1>
                <div className='flex items-end gap-3'>
                  <p className='text-3xl'>
                    {i18n.language === 'en' ? item.enMeaning : item.kzMeaning}
                  </p>
                </div>
              </motion.div>
              <motion.div variants={variants} className='w-[50%]'>
                <span className='text-gray-500'>
                  {t('search.regionResult')}
                </span>
                <p className='text-xl mb-5'>
                  {item.region
                    .map((region: string) => getRegionNames([region]))
                    .join(', ')}
                </p>
                <span className='text-gray-500'>{t('search.zoneResult')}</span>
                <p className='text-xl'>
                  {item.zone
                    .map((zone: string) => getZoneNames([zone]))
                    .join(', ')}{' '}
                  {t('search.kazakhstan')}
                </p>
              </motion.div>
            </motion.div>
          );
        })
      ) : (
        <div className='w-full h-fit flex flex-wrap items-center justify-center gap-10 py-5'>
          {!!data &&
            data.map((item, index) => (
              <div
                className='w-[30%] shadow p-5 hover:shadow-2xl transition-all flex justify-between'
                key={index}
                id='big'
              >
                <div>
                  <h2 className='text-2xl'>{item.title}</h2>
                  <p className='text-sm opacity-0 mt-5' id='small-meaning'>
                    {i18n.language === 'en' ? item.enMeaning : item.kzMeaning}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-[#6b6b6b]'>
                    {item.zone
                      .map((zone: string) => getZoneNames([zone]))
                      .join(', ')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </motion.div>
  );
};

export default Result;
