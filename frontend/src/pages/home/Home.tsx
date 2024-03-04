import styles from './Home.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);

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
    <>
      <motion.div
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
              className='h-[100px] w-[100px] bg-[url(./ornament3.svg)] dark:bg-[url(./ornament4.svg)] 
              bg-no-repeat'
              style={{ x: yBg, y: yBg }}
            ></motion.div>
          </div>
          <div
            className='w-full h-screen absolute bg-[url(./background.png)] bg-[length:50%] bg-bottom bg-no-repeat'
            style={{ zIndex: 3 }}
          ></div>

          <motion.div
            variants={textVariants}
            initial='hidden'
            animate='visible'
            className='w-2/4 h-full flex flex-col items-center justify-center gap-5 mb-36'
            style={{ y: yText, position: 'relative', zIndex: 2 }}
          >
            <h1 className='text-6xl text-[#18181b] dark:text-white font-normal leading-[1.1em]'>
              <span className='text-[#00749E] dark:text-[#50A7D3]'>
                Қазақ диалектіне
              </span>
              <br /> арналған платформа
            </h1>
            <p className='text-[#656565] dark:text-[#D1D5DB]  leading-relaxed font-thin'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              officiis dolores cum optio natus nobis ipsum, placeat molestiae
              ipsa voluptates.
            </p>
          </motion.div>
        </div>
      </motion.div>
      <div
        className='w-full h-screen'
        style={{ scrollSnapAlign: 'center' }}
      ></div>
    </>
  );
};

export default Home;
