import { TextField } from '@radix-ui/themes';
import useLogin from '../../../../hooks/useLogin';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ILogin } from '../../../../app.interface';
import Button from '../../button/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loading from '../../loading/Loading';
import { useState } from 'react';
import ButtonUI from '../../button/Button';

const LoginForm = () => {
  const { login } = useLogin();
  const [showLoading, setShowLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onChange',
  });


  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    console.log(data);
    setShowLoading(true);
    await login(data.email, data.password);
    setTimeout(() => setShowLoading(false), 3000);
  };

  return (
    <>
      <motion.form
        initial={{ y: -250, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
        onSubmit={handleSubmit(onSubmit)}
        className='h-fit px-10 py-5 flex flex-col items-center justify-center gap-5'
        style={{
          boxShadow: '1px 2px 10px 0px #00000026',
        }}
      >
        <h1 className='text-2xl text-[#FFC100] font-bold my-5'>Sign In</h1>
        <TextField.Input
          color={errors?.email ? 'red' : 'indigo'}
          style={{
            width: 250,
          }}
          variant='soft'
          placeholder='Enter email...'
          {...register('email', {
            required: 'Email is require field',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Please enter valid email',
            },
          })}
        />
        {errors?.email && (
          <p style={{ color: 'red', fontSize: '0.6rem', margin: '-15px auto' }}>
            {errors.email.message}
          </p>
        )}
        <TextField.Input
          color={errors?.password ? 'red' : 'indigo'}
          style={{
            width: 250,
          }}
          variant='soft'
          type='password'
          placeholder='Password...'
          {...register('password', {
            required: 'Password is require field',
            maxLength: 12,
            minLength: 4,
          })}
        />
        {errors?.password && (
          <p style={{ color: 'red', fontSize: '0.6rem', margin: '-15px auto' }}>
            {errors.password.message}
          </p>
        )}
          <p className='text-xs'>
            <Link className='text-[#385185]' to='/forgot-password'>
            Забыли пароль?
            </Link>
          </p>
        <ButtonUI type='submit' title='Login' onClick={() => {}} />
        <div>
          <p className='text-sm'>
            Don't have an account?{' '}
            <Link className='text-[#0095F6]' to='/signup'>
              Sign up
            </Link>
          </p>
        </div>
      </motion.form>

      {showLoading ? <Loading /> : null}
    </>
  );
};

export default LoginForm;
