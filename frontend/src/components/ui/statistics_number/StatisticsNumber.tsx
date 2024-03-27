// @ts-ignore
import { useTranslation } from 'react-i18next';
import { animated, useSpring } from 'react-spring';
import { IAllDialect } from '../../../app.interface';
import { useEffect, useState } from 'react';

interface IStatisticsNumber {
  data: IAllDialect[] | undefined;
  dialectCountFromRegion: number;
}

const Number = ({ n }: { n: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 30, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
};

const StatisticsNumber: React.FC<IStatisticsNumber> = ({
  data,
  dialectCountFromRegion,
}) => {
  const { t } = useTranslation('translation');

  const [percent, setPercent] = useState(100);

  useEffect(() => {
    if(!!data && !!data.length) {
      setPercent((dialectCountFromRegion * 100) / data?.length)
    } else {
      setPercent(0)
    }
  }, [dialectCountFromRegion])


  return (
    <div className='w-full flex gap-5 text-center justify-center'>
      <div className='w-[200px] h-[180px] flex justify-center items-center flex-col gap-5 bg-[#DFEAFD] rounded-xl shadow-xl'>
        <div>
          <h1 className='text-5xl'>
            {!!data && <Number n={dialectCountFromRegion} />}
          </h1>
        </div>
        <div>
          <p>{t('statistic.numberBlock.title')}</p>
        </div>
      </div>
      <div className='w-[200px] h-[180px] flex justify-center items-center flex-col gap-5 bg-[#DFEAFD] rounded-xl shadow-xl'>
        <div>
          <h1 className='text-5xl flex'>
            <Number n={percent} /> <span>%</span>
          </h1>
        </div>
        <div>
          <p>{t('statistic.numberBlock.percent')}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsNumber;
