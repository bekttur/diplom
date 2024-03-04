// @ts-ignore
import { useTranslation } from 'react-i18next';

const SelectLngs = () => {
  const { i18n } = useTranslation('translation');

  const lngs = {
    kz: { nativeName: 'kz' },
    en: { nativeName: 'en' },
  };

  const langClick = (lng: string) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  };

  return (
    <>
      {Object.keys(lngs).map((lng, index) => (
        <button key={index} type='submit' onClick={() => langClick(lng)}>
          {/* @ts-ignore */}
          {lngs[lng].nativeName === 'kz' ? (
            <img width={30} src='./flag/kaz.png' />
          ) : (
            <img width={30} src='./flag/eng.png' />
          )}
        </button>
      ))}
    </>
  );
};

export default SelectLngs;
