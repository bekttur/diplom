// @ts-ignore
import { useTranslation } from 'react-i18next';
import { Box, Tabs } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import EditRole from './editRole/EditRole';
import EditDialect from './editDialect/EditDialect';
import { useAuthContext } from '../../context/AuthContext';
import { IAuthUser } from '../../app.interface';
import { useEffect, useRef } from 'react';
const AddPage = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { t } = useTranslation('translation');

  const { authUser } = useAuthContext();
  const typedAuthUser = authUser as IAuthUser | null;


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
      <motion.div
        id='main'
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='w-full h-screen flex flex-col items-center justify-start'
        style={{ scrollSnapAlign: 'center' }}
      >
        <Tabs.Root className='mt-28' defaultValue='editDialect'>
          <Tabs.List className='flex gap-5'>
            <Tabs.Trigger value='editDialect'>{t('menu.dialect')}</Tabs.Trigger>
            {typedAuthUser && typedAuthUser.role === 'admin' ? (
              <Tabs.Trigger value='editRole'>{t('menu.role')}</Tabs.Trigger>
            ) : null}
          </Tabs.List>

          <Box px='4' pt='5' pb='2'>
            <Tabs.Content value='editDialect'>
              <EditDialect />
            </Tabs.Content>

            {typedAuthUser && typedAuthUser.role === 'admin' ? (
              <Tabs.Content value='editRole'>
                <EditRole />
              </Tabs.Content>
            ) : null}
          </Box>
        </Tabs.Root>
      </motion.div>
    </>
  );
};

export default AddPage;
