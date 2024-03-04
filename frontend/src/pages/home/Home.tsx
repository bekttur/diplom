import styles from './Home.module.scss';
import { motion } from 'framer-motion';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation('translation');

  const firstVariants = {
    hidden: {
      y: 150,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        when: 'beforeChildren',
      },
    },
  };

  const secondVariants = {
    hidden: {
      y: 100,
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

  const sliderVariants = {
    initial: {
      x: 1500,
    },
    animate: {
      x: '-260%',
      transition: {
        repeat: Infinity,
        // repeatType: 'mirror',
        duration: 100,
      },
    },
  };

  return (
    <>
      <div className='w-full h-screen' style={{scrollSnapAlign: 'center'}}>
        
      </div>
      <div
        className={`${styles.main} bg-[url(./bg-white.png)] dark:bg-[url(/dark-bg.avif)]`}
        style={{scrollSnapAlign: 'center'}}
      >
        <div className={`${styles.overlay} bg-[#ffffffc5] dark:bg-[#010409d0]`}>
          <div className='w-3/5 h-full flex flex-col items-center justify-center gap-5'>
            <motion.h1
              variants={firstVariants}
              initial='hidden'
              animate='visible'
              className='text-5xl text-[#18181b] dark:text-white font-normal leading-tight'
            >
              Қазақ диалектіне арналған платформа
            </motion.h1>
            <motion.p
              variants={secondVariants}
              initial='hidden'
              animate='visible'
              className=' text-[#18181b] dark:text-[#D1D5DB]  leading-relaxed'
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              officiis dolores cum optio natus nobis ipsum, placeat molestiae
              ipsa voluptates.
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
