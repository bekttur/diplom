import styles from './Authorization.module.scss';
import LoginForm from '../../components/ui/form/LoginForm/LoginForm';
import { useLocation } from 'react-router-dom';
import SignUpForm from '../../components/ui/form/SignUpForm/SignUpForm';
import ForgotPasswordForm from '../../components/ui/form/ForgotPasswordFrom/ForgotPasswordForm';

const Login = () => {
  const location = useLocation();

  return (
    <>
      <div
        className='flex items-center justify-between'
      >
        <div className={styles.block}>
          <div className={styles.background}></div>
        </div>
        <div className={`${styles.form} dark:bg-[#0F0F0F]`}>
          {location.pathname === '/login' ? (
            <LoginForm />
          ) : location.pathname === '/signup' ? (
            <SignUpForm />
          ) : location.pathname === '/forgot-password' ? (
            <ForgotPasswordForm />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Login;
