// @ts-ignore
import { useTranslation } from 'react-i18next';
import Abay from '../../components/ui/abay/Abay';
import Typewriter from '../../components/ui/text-animation/Typewriter';
import { useState } from 'react';
import SearchForm from '../../components/screen/search/searchForm/SearchForm';
import Result from '../../components/screen/search/result/Result';
import { useDialects } from '../../hooks/useDialects';
import AbayDark from '../../components/ui/abay/AbayDark';

const Search = () => {
  const { t } = useTranslation('translation');

  const [handleDialect, setHandleDialect] = useState('');

  const { isLoading, data } = useDialects();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='w-full h-screen flex items-start justify-center overflow-x-hidden bg-[#f1f1f100] overflow-y-hidden' style={{scrollSnapAlign: 'center'}}>
            <div className=' w-full h-1/1 flex items-end justify-center'>
              <div
                className='w-3/6'
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div className='w-1/1 text-start'>
                  <h3 className='text-6xl font-semibold text-[#5F5F5F] dark:text-[#dddddd]'>
                    <Typewriter text={t('search')} delay={50} />
                  </h3>
                  <div>
                    <SearchForm
                      handleDialect={handleDialect}
                      setHandleDialect={setHandleDialect}
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
          {/* @ts-ignore */}
          <Result data={data} handleDialect={handleDialect} />
        </>
      )}
    </>
  );
};

export default Search;
