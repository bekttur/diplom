import { useRef } from 'react';
import styles from './Advantages.module.scss';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Item } from '../../../app.interface';
import { items } from './advantages.data';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const Single = ({ item }: { item: Item }) => {
  const { t } = useTranslation('translation');

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section
      className='w-full h-screen'
      style={{
        scrollSnapAlign: 'center',
        scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth'
      }}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.imageContainer} ref={ref}>
            <img src={item.img} />
          </div>
          <motion.div 
            className={styles.textContainer} 
            // style={{ y }}
          >
            <h2>{t(item.title)}</h2>
            <p>{t(item.description)}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Advantages = () => {
  const { t } = useTranslation('translation');

  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className={styles.advantages} ref={ref}>
      <div className={styles.progress}>
        <h1 className='text-[#00749E] dark:text-[#51A7D3]'>
          {t('home.advantages.title')}
        </h1>
        <motion.div
          style={{ scaleX }}
          className={styles.progressBar}
        ></motion.div>
      </div>
      {items.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Advantages;
