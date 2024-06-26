import { links } from '../header/header.data';
import { Link } from 'react-router-dom';
import SelectLngs from '../../ui/selectLngs/SelectLngs';
import Checkbox from '../../ui/checkbox/Checkbox';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import Facebook from '../../../../public/logo/Facebook';
import WhatsApp from '../../../../public/logo/WhatsApp';
import Instagram from '../../../../public/logo/Instagram';
import Telegram from '../../../../public/logo/Telegram';

const Footer = () => {
  const { t } = useTranslation('translation');

  return (
    <div
      className='w-full h-fit p-5 flex items-center justify-center flex-col gap-5 bg-[#fff] dark:bg-[#18191B] text-[#18181b] dark:text-white border-t-2 border-[#F5F5F5] dark:border-[#FFC100]'
      style={{ scrollSnapAlign: 'center'}}
    >
      <div>
        <ul className='flex items-center justify-between gap-3 cursor-pointer'>
          <li>
            <a target='_blank' href='https://www.facebook.com/bektturr/'>
              <Facebook />
            </a>
          </li>
          <li>
            <a target='_blank' href='https://wa.me/77054799199'>
              <WhatsApp />
            </a>
          </li>
          <li>
            <a target='_blank' href='https://instagram.com/bekttur'>
              <Instagram />
            </a>
          </li>
          <li>
            <a target='_blank' href='https://t.me/bekttur'>
              <Telegram />
            </a>
          </li>
          {/* <li>
            <Tiktok />
          </li> */}
        </ul>
      </div>
      <div>
        <ul className='flex items-center justify-center gap-5 list-none'>
          {links.map((link, index) => {
            return (
              <div key={index}>
                <Link to={link.href}>
                  <li className='font-normal'>{t(link.title)}</li>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
      <div className='w-full flex items-center justify-between'>
        <div>
          <p>{t('footer.rights')}</p>
          <div className='flex'>
            <SelectLngs />
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-2'>
          <Checkbox />
        </div>
      </div>
    </div>
  );
};

export default Footer;
