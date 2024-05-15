import { useEffect, useRef, useState } from 'react';
import Diagram from '../../components/ui/diagram/Diagram';
import MapSvg from '../../components/ui/map/MapSvg';
import { useDialects } from '../../hooks/useDialects';
import { IAllDialect } from '../../app.interface';
import StatisticsNumber from '../../components/ui/statistics_number/StatisticsNumber';

const Statistics = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { data } = useDialects();
  const [dialectCountFromRegion, setDialectCountFromRegion] = useState(0);

  useEffect(() => {
    if (data && data.length) {
      setDialectCountFromRegion(data.length);
    }
  }, [data]);

  const [zoneCount, setZoneCount] = useState({
    westCount: 0,
    eastCount: 0,
    northCount: 0,
    southCount: 0,
    centerCount: 0,
  });

  useEffect(() => {
    setZoneCount({
      westCount: 0,
      eastCount: 0,
      northCount: 0,
      southCount: 0,
      centerCount: 0,
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      data.forEach((item: IAllDialect) => {
        item.zone.forEach((zone: string) => {
          switch (zone) {
            case 'west':
              setZoneCount((prevCount) => ({
                ...prevCount,
                westCount: prevCount.westCount + 1,
              }));
              break;
            case 'east':
              setZoneCount((prevCount) => ({
                ...prevCount,
                eastCount: prevCount.eastCount + 1,
              }));
              break;
            case 'north':
              setZoneCount((prevCount) => ({
                ...prevCount,
                northCount: prevCount.northCount + 1,
              }));
              break;
            case 'south':
              setZoneCount((prevCount) => ({
                ...prevCount,
                southCount: prevCount.southCount + 1,
              }));
              break;
            default:
              setZoneCount((prevCount) => ({
                ...prevCount,
                centerCount: prevCount.centerCount + 1,
              }));
          }
        });
      });
    }
  }, [data]);

  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <div
      id='main'
      ref={ref}
      className='w-full h-screen flex justify-around items-end pb-10'
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className='w-2/4 h-[600px] flex items-center justify-center '>
        <MapSvg
          data={data}
          setDialectCountFromRegion={setDialectCountFromRegion}
        />
      </div>
      <div className='w-1/4 flex flex-col gap-5 items-center justify-center'>
        <div
          className='w-fit h-fit shadow-2xl rounded-2xl'
          style={{
            background: 'linear-gradient(90deg, #C33764 0%,#1D2671 100%)',
          }}
        >
          <div className='w-[420px] h-[400px] p-10 rounded-2xl bg-white bg-opacity-75 dark:bg-black dark:bg-opacity-55 shadow-lg backdrop-blur-5'>
            <Diagram zoneCount={zoneCount} />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <StatisticsNumber
            data={data}
            dialectCountFromRegion={dialectCountFromRegion}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
