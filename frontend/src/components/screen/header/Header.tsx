import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './Header.module.scss';
import { links } from './header.data';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../context/AuthContext';
import { IAuthUser } from '../../../app.interface';
import Dropdown from '../../ui/dropdownHeader/Dropdown';

const Header = () => {
  const { t } = useTranslation('translation');

  const {id} = useParams()

  const { authUser } = useAuthContext();
  const typedAuthUser = authUser as IAuthUser | null;

  const location = useLocation();

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -250,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 0.7,
        when: 'beforeChildren',
      },
    },
  };

  return (
    <>
        <motion.div
          variants={menuVariants}
          initial='hidden'
          animate='visible'
          className='w-full h-fit p-0 text-[#18181b] dark:text-white  dark:bg-transparent absolute t-0 z-50'
        >
          <div className='w-full flex items-center justify-around p-5'>
            <div style={{ width: 240 }}>
              <h1 className='text-2xl font-semibold'>Dialect</h1>
            </div>
            <ul className='flex items-center justify-center gap-5 list-none'>
              {links.map((link, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={link.href}
                      className={`${styles.navbar} ${styles.left} ${
                        location.pathname == link.href ? styles.active : ''
                      } `}
                    >
                      <li className='font-normal'>{t(link.title)}</li>
                    </Link>
                  </div>
                );
              })}
              {(typedAuthUser && typedAuthUser.role === 'admin') ||
              typedAuthUser?.role === 'сonnector' ? (
                <Link
                  to='/add'
                  className={`${styles.navbar} ${styles.left} ${
                    location.pathname === '/add'
                      ? styles.active
                      : location.pathname === '/add/users'
                      ? styles.active
                      : location.pathname === '/add/dialect'
                      ? styles.active
                      : location.pathname === `/add/${id}`
                      ? styles.active
                      : null
                  } `}
                >
                  Add
                </Link>
              ) : null}
            </ul>
            <div className='flex items-center justify-center gap-2'>
              <Dropdown />
            </div>
          </div>
        </motion.div>
      <Outlet />
    </>
  );
};

export default Header;
