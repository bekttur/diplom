import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './AddNavbar.module.scss';
import { motion } from 'framer-motion';

const addNav = [
  {
    title: 'Add',
    href: '/add',
  },
  {
    title: 'Users',
    href: '/add/users',
  },
  {
    title: 'Edit Dialect',
    href: '/add/dialect',
  },
];

const AddNavbar = () => {
  const location = useLocation();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='flex h-fit shadow bg-white dark:bg-transparent gap-5 px-2 mb-10'
      >
        {addNav.map((link, index) => (
          <Link key={index} to={link.href}>
            <div
              className={`${styles.navbar} ${styles.left} ${
                location.pathname === link.href
                  ? styles.active
                  : ''
              } `}
            >
              <h3>{link.title}</h3>
            </div>
          </Link>
        ))}
      </motion.div>
      <Outlet />
    </>
  );
};

export default AddNavbar;
