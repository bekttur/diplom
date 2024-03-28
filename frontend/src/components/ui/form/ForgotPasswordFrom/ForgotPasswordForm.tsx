// @ts-ignore
import { useTranslation } from 'react-i18next';
import { AlertDialog, Button, Flex, TextField } from '@radix-ui/themes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IForgotPassword } from '../../../../app.interface';

import { motion } from 'framer-motion';
import { AuthService } from '../../../../services/auth.service';
import { Link } from 'react-router-dom';
import ButtonUI from '../../button/Button';

const ForgotPasswordForm = () => {
  const { t } = useTranslation('translation');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IForgotPassword> = async (data) => {
    await AuthService.postForgotPass(data.email);
  };

  return (
    <>
      <motion.form
        initial={{ y: -250, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
        onSubmit={handleSubmit(onSubmit)}
        className='h-fit px-10 py-5 flex flex-col items-center justify-center gap-5 bg-[#fff] dark:bg-[#18181b] rounded-xl'
        style={{
          boxShadow: '1px 2px 10px 0px #00000026',
        }}
      >
        <h1 className='text-2xl text-[#FFC100] font-bold my-5'>
          {t('authorization.forgetTitle')}
        </h1>
        <TextField.Input
          color={errors?.email ? 'red' : 'indigo'}
          style={{
            width: 250,
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
          <p style={{ color: 'red', fontSize: '0.6rem', margin: '-15px auto' }}>
            {errors.email.message}
          </p>
        )}

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <ButtonUI
              type='submit'
              title={t('authorization.forgetButton')}
              onClick={() => {}}
            />
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>
              {t('authorization.alertForgot')}
            </AlertDialog.Title>
            <AlertDialog.Description size='2'>
            {t('authorization.alertDescription')}
            </AlertDialog.Description>

            <Flex gap='3' mt='4' justify='end'>
              <AlertDialog.Cancel>
                <Button variant='solid' color='blue'>
                  OK
                </Button>
              </AlertDialog.Cancel>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
        <div>
          <p className='text-sm'>
            <Link className='text-[#0095F6]' to='/login'>
              {t('authorization.linkLogin')}
            </Link>
          </p>
        </div>
      </motion.form>
    </>
  );
};

export default ForgotPasswordForm;
