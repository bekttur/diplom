import { TextField } from '@radix-ui/themes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IForgotPassword } from '../../../../app.interface';
import Button from '../../button/Button';
import { motion } from 'framer-motion';
import { AuthService } from '../../../../services/auth.service';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
    console.log(data);
	alert('Мы отправили Вам письмо!')
    await AuthService.postForgotPass(data.email)
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
        <h1 className='text-2xl text-[#FFC100] font-bold my-5'>
          Forgot Password
        </h1>
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
        <Button type='submit' title='Submit' onClick={() => {}} />
        <div>
          <p className='text-sm'>
            <Link className='text-[#0095F6]' to='/login'>
              Log in
            </Link>
          </p>
        </div>
      </motion.form>
    </>
  );
};

export default ForgotPasswordForm;
