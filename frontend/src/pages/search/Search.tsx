// @ts-ignore
import { useTranslation } from 'react-i18next';
import Abay from '../../components/ui/abay/Abay';
import Typewriter from '../../components/ui/text-animation/Typewriter';
import { useEffect, useRef, useState } from 'react';
import SearchForm from '../../components/screen/search/searchForm/SearchForm';
import Result from '../../components/screen/search/result/Result';
import AbayDark from '../../components/ui/abay/AbayDark';
import Advantages from '../../components/screen/search/advantages/Advantages';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IAllDialect } from '../../app.interface';
import { APP_BACKEND_IP } from '../../../appconfig';
import Steps from '../../components/screen/search/result/Steps';

const Search = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { t } = useTranslation('translation');

  const [handleDialect, setHandleDialect] = useState('');
  const [currentRegion, setCurrentRegion] = useState(['']);
  const [hasData, setHasData] = useState(true); // State to track if data exists

  // const { data } = useDialects();

  const { data, isLoading } = useQuery({
    queryKey: ['dialects', handleDialect, currentRegion],
    // enabled: false,
    queryFn: () =>
      axios.get<IAllDialect[]>(
        `${APP_BACKEND_IP}/data?zone=${currentRegion}&title=${handleDialect}`
      ),
    select: ({ data }) => data,
    retry: 10,
  });

  useEffect(() => {
    // Check if there is no data to display
    if (!isLoading && (!data || data.length === 0)) {
      setHasData(false);
    } else {
      setHasData(true);
    }
  }, [data, isLoading]);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash !== '#result') {
      window.scrollTo(0, 0);
      return;
    }

    if (hash === '#result' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // UP btn
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
    <>
      <div
        id='main'
        ref={ref}
        className='w-full h-screen flex items-start justify-center overflow-x-hidden bg-[#f1f1f100] overflow-y-hidden'
        style={{ scrollSnapAlign: 'center' }}
      >
        <div className=' w-full h-1/1 flex items-end justify-center'>
          <div className='w-3/6' style={{ position: 'relative', zIndex: 1 }}>
            <div className='w-1/1 text-start'>
              <h3 className='text-6xl font-semibold text-[#5F5F5F] dark:text-[#dddddd]'>
                <Typewriter text={t('search.title')} delay={50} />
              </h3>
              <div>
                <SearchForm
                  handleDialect={handleDialect}
                  setHandleDialect={setHandleDialect}
                  resultRef={resultRef}
                  currentRegion={currentRegion}
                  setCurrentRegion={setCurrentRegion}
                />
              </div>
            </div>
          </div>
          <div className='w-2/6'>
            <div className='w-1/1 text-start'>
              <div className='block dark:hidden'>
                <Abay />
              </div>
              <div className='hidden dark:block'>
                <AbayDark />
              </div>
            </div>
          </div>
        </div>
      </div>
      {hasData ? (
        <div id='result' ref={resultRef}>
          <Result data={data} handleDialect={handleDialect} />
        </div>
      ) : (
        <div
          id='result'
          ref={resultRef}
          className='w-full h-[80vh] flex items-center justify-center'
        >
          <div className='w-[30%]'>
            {handleDialect.length < 15 ? (
              <p className='text-5xl mb-3'>
                {t('search.no-result.first')}{' '}
                <span className='text-[#00749E]'>
                  «{handleDialect.toLowerCase()}»{' '}
                </span>
                {t('search.no-result.second')}
              </p>
            ) : (
              <p className='text-5xl mb-3'>
                {t('search.no-result.first')} {t('search.no-result.second')}
              </p>
            )}
            <p>{t('search.no-result.description')}</p>
          </div>
          <img
            width={250}
            src='../../../public/other/no-result.png'
          />
        </div>
      )}

      <Steps />
      <Advantages />
    </>
  );
};

export default Search;
