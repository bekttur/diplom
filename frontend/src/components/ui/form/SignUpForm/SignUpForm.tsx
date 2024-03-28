import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUp } from '../../../../app.interface';
import useSignUp from '../../../../hooks/useSignUp';
import { TextField } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ButtonUI from '../../button/Button';

const SignUpForm = () => {
  const { signup } = useSignUp();
  const { t } = useTranslation('translation');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    console.log(data);
    await signup({ ...data, role: 'user' });
  };

  return (
    <>
      <motion.form
        initial={{ y: -250, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
        onSubmit={handleSubmit(onSubmit)}
        className='w-150 h-fit px-10 py-5 flex flex-col items-center justify-center gap-5 bg-[#fff] dark:bg-[#18181b] rounded-xl'
        style={{
          boxShadow: '1px 2px 10px 0px #00000026',
        }}
      >
        <h1 className='text-2xl text-[#FFC100] font-bold my-5'>
          {t('authorization.signUp')}
        </h1>
        <TextField.Input
          color={errors?.fullname ? 'red' : 'indigo'}
          style={{
            width: 320,
          }}
          variant='soft'
          placeholder={t('authorization.fullName')}
          {...register('fullname', {
            required: `${t('authorization.errors.fullName')}`,
          })}
        />
        {errors?.fullname && (
          <p
            style={{
              color: 'red',
              fontSize: '0.6rem',
              marginTop: -20,
            }}
          >
            {errors.fullname.message}
          </p>
        )}
        <div className='flex items-start justify-center gap-5'>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.address ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              type='text'
              variant='soft'
              placeholder={t('authorization.address')}
              {...register('address', {
                required: `${t('authorization.errors.address')}`,
                minLength: 4,
              })}
            />
            {errors?.address && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.address.message}
              </p>
            )}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.city ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              type='text'
              variant='soft'
              placeholder={t('authorization.city')}
              {...register('city', {
                required: `${t('authorization.errors.city')}`,
                maxLength: 12,
                minLength: 4,
              })}
            />
            {errors?.city && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.city.message}
              </p>
            )}
          </div>
        </div>
        <div className='flex items-start justify-center gap-5'>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.birthday ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              type='date'
              variant='soft'
              placeholder='Enter birthday...'
              {...register('birthday', {
                required: 'Birthday is require field',
                maxLength: 12,
                minLength: 4,
              })}
            />
            {errors?.birthday && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.birthday.message}
              </p>
            )}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.gender ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              type='text'
              variant='soft'
              placeholder='Enter gender...'
              {...register('gender', {
                required: 'Gender is require field',
                maxLength: 12,
                minLength: 4,
              })}
            />
            {errors?.gender && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>
        <div className='flex items-start justify-center gap-5'>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.phone ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              type='text'
              variant='soft'
              placeholder={t('authorization.phone')}
              {...register('phone', {
                required: `${t('authorization.errors.phone')}`,
                maxLength: 12,
                minLength: 4,
              })}
            />
            {errors?.phone && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.email ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              variant='soft'
              placeholder={t('authorization.email')}
              {...register('email', {
                required: `${t('authorization.errors.email')}`,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: `${t('authorization.errors.validEmail')}`,
                },
              })}
            />
            {errors?.email && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className='flex items-start justify-center gap-5'>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.password ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              variant='soft'
              type='password'
              placeholder={t('authorization.password')}
              {...register('password', {
                required: `${t('authorization.errors.password')}`,
                maxLength: 12,
                minLength: 4,
              })}
            />
            {errors?.password && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <TextField.Input
              color={errors?.confirmPassword ? 'red' : 'indigo'}
              style={{
                width: 150,
              }}
              type='password'
              variant='soft'
              placeholder={t('authorization.confirmPassword')}
              {...register('confirmPassword', {
                required: `${t(
                  'authorization.errors.confirmPassword'
                )}`,
                maxLength: 12,
                minLength: 4,
              })}
            />
            {errors?.confirmPassword && (
              <p
                style={{
                  color: 'red',
                  fontSize: '0.6rem',
                  position: 'sticky',
                }}
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <ButtonUI
          type='submit'
          title={t('authorization.signUp')}
          onClick={() => {}}
        />

        <div>
          <p className='text-sm'>
            {t('authorization.haveAccount')}{' '}
            <Link className='text-[#0095F6]' to='/login'>
              {t('authorization.linkLogin')}
            </Link>
          </p>
        </div>
      </motion.form>
    </>
  );
};

export default SignUpForm;
