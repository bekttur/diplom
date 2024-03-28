// @ts-ignore
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import UserInfo from '../../components/screen/userInfo/UserInfo';
import { useAuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Profile = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { t } = useTranslation('translation');

  const { authUser } = useAuthContext();
  console.log(authUser);

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
    <motion.div
      id='main'
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full h-fit flex flex-col items-center justify-center'
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className='w-full h-screen flex items-center justify-center gap-20 mt-5'>
        <UserInfo />
        <div className='w-3/6 h-2/3 flex flex-col gap-5'>
          <div className='flex items-end gap-3'>
            <h1 className='text-3xl font-semibold text-[#00749E] dark:text-[#76C7F0]'>
              {authUser?.fullname}
            </h1>
            <div className='flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs'>
              <MapPin width={8} strokeWidth={2} />
              <p>{authUser?.city}</p>
            </div>
          </div>
          <div className='w-full bg-opacity-20 bg-white dark:bg-[#18191B] backdrop-blur-5 shadow rounded-lg border border-opacity-30 dark:border-none p-10'>
            <p className='text-[12px] mb-1 leading-[15px] text-gray-400'>
              {t('profile.contactInfo')}
            </p>
            <div className='w-1/1 text-[16px] leading-10'>
              <div className='flex items-start justify-between'>
                <p> {t('profile.phone')}</p>
                <p className='text-[#00749E] dark:text-[#76C7F0]'>
                  {authUser?.phone}
                </p>
              </div>
              <hr className='bg-[#e1e1e1c8] dark:bg-[#8585851e] border-none' />
              <div className='w-full flex items-start justify-between flex-wrap'>
                <p> {t('profile.address')}</p>
                <p className='text-[#00749E] dark:text-[#76C7F0]'>
                  {authUser?.address}
                </p>
              </div>
              <hr className='bg-[#e1e1e1c8] dark:bg-[#8585851e] border-none' />
              <div className='flex items-start justify-between'>
                <p> {t('profile.email')}</p>
                <p className='text-[#00749E] dark:text-[#76C7F0]'>
                  {authUser?.email}
                </p>
              </div>
              <hr className='bg-[#e1e1e1c8] dark:bg-[#8585851e] border-none' />
            </div>
          </div>
          <div className='w-full bg-opacity-20 bg-white dark:bg-[#18191B] backdrop-blur-5 shadow rounded-lg border border-opacity-30 dark:border-none p-10'>
            <p className='text-[12px] mb-1 leading-[15px] text-gray-400'>
              {t('profile.basicInfo')}
            </p>
            <div className='w-[100%] text-[16px] leading-10'>
              <div className='flex items-start justify-between'>
                <p> {t('profile.birthday')}</p>
                <p className='text-[#00749E] dark:text-[#76C7F0]'>
                  {authUser?.birthday}
                </p>
              </div>
              <hr className='bg-[#e1e1e1c8] dark:bg-[#8585851e] border-none'/>
              <div className='w-full flex items-start justify-between flex-wrap'>
                <p> {t('profile.gender')}</p>
                <p className='text-[#00749E] dark:text-[#76C7F0]'>
                  {authUser?.gender}
                </p>
              </div>
              <hr className='bg-[#e1e1e1c8] dark:bg-[#8585851e] border-none'/>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
