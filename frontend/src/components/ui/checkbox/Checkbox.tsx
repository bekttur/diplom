import { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from '../../screen/header/Header.module.scss';

const Checkbox = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwich = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div>
      <input
        onClick={handleThemeSwich}
        type='checkbox'
        style={{
          opacity: 0,
          position: 'absolute',
        }}
        className={styles.checkbox}
        id='checkbox'
      />
      <label
        htmlFor='checkbox'
        className={`${styles.label} bg-transparent border border-solid border-gray-300 dark:border-[#292929]`}

      >
        <LightModeIcon
          className={`${styles.fas} text-[#f1c40f]`}
          style={{
            position: 'relative',
            zIndex: 5,
          }}
        ></LightModeIcon>
        <DarkModeIcon
          className={`${styles.fas} text-[#f39c12]`}
          style={{
            position: 'relative',
            zIndex: 5,
          }}
        ></DarkModeIcon>
        <div className={`${styles.ball} bg-[#EBEBEB] dark:bg-[#262626]`}></div>
      </label>
    </div>
  );
};

export default Checkbox;
