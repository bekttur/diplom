// @ts-ignore
import { useTranslation } from 'react-i18next';
import Abay from '../../components/ui/abay/Abay';
import Typewriter from '../../components/ui/text-animation/Typewriter';
import { useEffect, useRef, useState } from 'react';
import SearchForm from '../../components/screen/search/searchForm/SearchForm';
import Result from '../../components/screen/search/result/Result';
import { useDialects } from '../../hooks/useDialects';
import AbayDark from '../../components/ui/abay/AbayDark';
import Advantages from '../../components/screen/search/advantages/Advantages';

const Search = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { t } = useTranslation('translation');

  const [handleDialect, setHandleDialect] = useState('');
  const [currentRegion, setCurrentRegion] = useState(['']);

  const { data } = useDialects();

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
      <div id='result' ref={resultRef}>
        <Result
          data={data}
          handleDialect={handleDialect}
          currentRegion={currentRegion}
        />
      </div>
      <Advantages />
    </>
  );
};

export default Search;
