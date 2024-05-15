import styles from '../Home.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const Main = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { t } = useTranslation('translation');
  const ref = useRef<HTMLDivElement>(null);

  // UP btn
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibility(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleVisibility]);

  // scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const textVariants = {
    hidden: {
      y: 80,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
  };

  return (
    <motion.div
      id='main'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`${styles.main} `}
      style={{
        scrollSnapAlign: 'center',
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
      }}
      ref={ref}
    >
      <div className={styles.overlay}>
        <div
          className='absolute bottom-20 right-[-100px]'
          style={{ transform: 'rotate(310deg) scale(10)', zIndex: 2 }}
        >
          <motion.div
            className='h-[100px] w-[100px] bg-[url(./other/ornament3.svg)] dark:bg-[url(./other/ornament4.svg)]
            bg-no-repeat'
            style={{ y: yBg }}
          ></motion.div>
        </div>
        <div
          className='w-full h-screen absolute bg-[url(./other/background.png)] bg-[length:50%] bg-bottom bg-no-repeat'
          style={{ zIndex: 3 }}
        ></div>

        <motion.div
          variants={textVariants}
          initial='hidden'
          animate='visible'
          className='w-2/4 h-full flex flex-col items-center justify-center gap-5 mb-36'
          style={{ y: yText, position: 'relative', zIndex: 2 }}
        >
          <h1 className='text-5xl text-[#18181b] dark:text-white font-normal leading-[1.1em]'>
            <span className='text-[#00749E] dark:text-[#50A7D3]'>
              {t('home.titleBlue')}
            </span>
            <br />
            {t('home.title')}
          </h1>
          <p className='text-[#656565] dark:text-[#D1D5DB]  leading-relaxed font-thin'>
          {t('home.description')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Main;
