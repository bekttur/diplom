import MapSvg from '../../components/ui/map/MapSvg';
import styles from './Statistics.module.scss';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

// @ts-ignore
function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 30, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

const Statistics = () => {
  return (
    <div
      className={`${styles.statistic} bg-[#f1f1f100]  text-[#18181b] dark:text-white`}
      style={{scrollSnapAlign: 'center'}}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <MapSvg />
      </motion.div>
      <div className='flex gap-10 text-center'>
        <div className='flex justify-center items-center flex-col gap-5'>
          <div>
            <h1 className='text-5xl'>
              <Number n={170} />
            </h1>
          </div>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className='flex justify-center items-center flex-col gap-5'>
          <div>
            <h1 className='text-5xl'>
              <Number n={4439} />
            </h1>
          </div>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className='flex justify-center items-center flex-col gap-5'>
          <div>
            <h1 className='text-5xl'>
              <Number n={2000} />
            </h1>
          </div>
          <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
