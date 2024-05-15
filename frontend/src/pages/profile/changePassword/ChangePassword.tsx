import { SubmitHandler, useForm } from 'react-hook-form';
import { IChangePassword } from '../../../app.interface';
import { useAuthContext } from '../../../context/AuthContext';
import { UsersService } from '../../../services/users.service';
import toast from 'react-hot-toast';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
// @ts-ignore
import { useTranslation } from 'react-i18next';

const ChangePassword = () => {
  const { authUser } = useAuthContext();
  const { t } = useTranslation('translation');

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errorsPass },
  } = useForm<IChangePassword>({
    mode: 'onChange',
  });

  const onSubmitPass: SubmitHandler<IChangePassword> = async (data) => {
    if (!authUser) return;

    try {
      if (!data) {
        throw new Error('User data is null');
      }

      UsersService.putChangePassword(
        authUser.email,
        data.oldPassword,
        data.newPassword,
        data.confirmPassword
      );

      if (data.newPassword === data.confirmPassword) {
        toast.success('Successfully updated!');
      } else {
        toast.error('Пароли не совпадают!');
      }
    } catch (error) {
      toast.error('Error updating');
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          style={{ width: '100%', height: 50, backgroundColor: '#FFC100' }}
        >
          {t('profile.changePassword')}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{t('profile.changePassword')}</Dialog.Title>
        <Dialog.Description size='2' mb='4'>
          {t('profile.changePassDescription')}
        </Dialog.Description>

        <Flex direction='column' gap='3'>
          <label>
            <Text as='div' size='2' mb='1' weight='bold'>
              {t('profile.oldPassword')}
            </Text>
            <TextField.Input
              color={errorsPass?.oldPassword ? 'red' : 'indigo'}
              variant='soft'
              type='password'
              placeholder={t('profile.enterOldPass')}
              {...registerPass('oldPassword', {
                required: `error`,
                maxLength: 12,
                minLength: 4,
              })}
            />
          </label>
          <label>
            <Text as='div' size='2' mb='1' weight='bold'>
              {t('profile.newPassword')}
            </Text>
            <TextField.Input
              color={errorsPass?.newPassword ? 'red' : 'indigo'}
              variant='soft'
              type='password'
              {...registerPass('newPassword', {
                required: `error`,
                maxLength: 12,
                minLength: 4,
              })}
              placeholder={t('profile.enterNewPass')}
            />
          </label>
          <label>
            <Text as='div' size='2' mb='1' weight='bold'>
              {t('profile.confirmPassword')}
            </Text>
            <TextField.Input
              color={errorsPass?.confirmPassword ? 'red' : 'indigo'}
              variant='soft'
              type='password'
              {...registerPass('confirmPassword', {
                required: `error`,
                maxLength: 12,
                minLength: 4,
              })}
              placeholder={t('profile.enterConfirmPass')}
            />
          </label>
        </Flex>

        <Flex gap='3' mt='4' justify='end'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              {t('control.alert.cancel')}
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              style={{ backgroundColor: '#FFC100' }}
              onClick={handleSubmitPass(onSubmitPass)}
            >
              {t('control.edit.button')}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ChangePassword;
