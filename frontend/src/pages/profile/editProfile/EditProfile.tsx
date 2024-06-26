// @ts-ignore
import { useTranslation } from 'react-i18next';
import { Avatar, Button, TextField } from '@radix-ui/themes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../../app.interface';
import { useAuthContext } from '../../../context/AuthContext';
import { AuthService } from '../../../services/auth.service';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { UsersService } from '../../../services/users.service';
import { APP_BACKEND_IP } from '../../../../appconfig';
import { useNavigate } from 'react-router-dom';
import ButtonUI from '../../../components/ui/button/Button';
import ChangePassword from '../changePassword/ChangePassword';

const EditProfile = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { t } = useTranslation('translation');

  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [allImage, setAllImage] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    if (allImage && authUser) {
      const userAvatar = allImage.find(
        (elem: any) => elem.userEmail === authUser.email
      );
      if (userAvatar) {
        setAvatar(userAvatar);
      } else {
        setFallback(authUser.fullname.charAt(0));
      }
    }
  }, [allImage, authUser]);

  const [fallback, setFallback] = useState<string>('');

  const submitImage = async () => {
    if (!image || !authUser) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', authUser.email);

    let endpoint = `${APP_BACKEND_IP}/upload-image`;
    let method = 'POST';

    const userImage = allImage.find(
      (item) => item.userEmail === authUser.email
    );
    if (userImage) {
      endpoint = `${APP_BACKEND_IP}/update-image`;
      method = 'PUT';
    }

    try {
      await axios({
        method: method,
        url: endpoint,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      getImage();
    } catch (error) {
      console.error('Error submitting image:', error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    mode: 'onChange',
    defaultValues: {
      _id: authUser?._id,
      fullname: authUser?.fullname,
      email: authUser?.email,
      phone: authUser?.phone,
      birthday: authUser?.birthday ? new Date(authUser.birthday).toISOString().split('T')[0] : '',
      gender: authUser?.gender,
      address: authUser?.address,
      city: authUser?.city,
      role: authUser?.role,
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      if (!data) {
        throw new Error('User data is null');
      }

      await submitImage();
      AuthService.updateUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Successfully updated!');
      navigate('/profile');
    } catch (error) {
      toast.error('Error updating');
    } finally {
      window.location.reload();
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleChooseImageClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const getImage = async () => {
    const result = await UsersService.getImage();
    setAllImage(result.data.data);
  };

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
    <motion.div
      id='main'
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full h-fit flex items-start justify-center'
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className='w-3/4 h-screen flex flex-col items-start px-24 justify-center p-10 mt-10'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-10'
        >
          <div className='w-full h-fit flex justify-between'>
            <div className='w-1/3 h-fit flex flex-col gap-2 items-center justify-center'>
              <div className='w-full flex flex-col items-center justify-center'>
                {avatar ? (
                  <img
                    style={{ position: 'relative', zIndex: 2 }}
                    width={250}
                    src={`/images/${avatar.image}`}
                  />
                ) : (
                  <Avatar
                    style={{ width: 250, height: 250 }}
                    size='8'
                    fallback={fallback}
                    // radius="full"
                  />
                )}
                <input
                  id='fileInput'
                  hidden
                  type='file'
                  accept='image/*'
                  onChange={onInputChange}
                />
                <button
                  type='button'
                  className='w-[250px] h-fit py-2 border border-gray-600 rounded-3xl mt-3'
                  onClick={handleChooseImageClick}
                >
                  {t('profile.chooseAvatar')}
                </button>
              </div>
            </div>
            <div className='w-2/3 flex flex-col gap-8'>
              <div className='flex flex-col gap-1'>
                <p>{t('profile.fullName')}: </p>
                <TextField.Input
                  style={{
                    height: 50,
                  }}
                  variant='soft'
                  color={errors?.fullname ? 'red' : 'indigo'}
                  {...register('fullname', {
                    required: 'Full Name is require field',
                    maxLength: 40,
                    minLength: 2,
                  })}
                  placeholder='Full Name'
                />
              </div>
              <div className='flex gap-5'>
                <div className='w-full'>
                  <p>{t('profile.email')}: </p>
                  <TextField.Input
                    style={{
                      height: 50,
                    }}
                    variant='soft'
                    disabled
                    color={errors?.email ? 'red' : 'indigo'}
                    {...register('email', {
                      required: 'Email is require field',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Please enter valid email',
                      },
                    })}
                    placeholder='Email'
                  />
                </div>
                <div className='w-full'>
                  <p>{t('profile.phone')}: </p>
                  <TextField.Input
                    style={{
                      height: 50,
                    }}
                    variant='soft'
                    color={errors?.phone ? 'red' : 'indigo'}
                    {...register('phone', {
                      required: 'Phone is require field',
                    })}
                    placeholder='Phone'
                  />
                </div>
              </div>
              <div className='flex gap-5'>
                <div className='w-full'>
                  <p>{t('profile.birthday')}: </p>
                  <TextField.Input
                    style={{
                      height: 50,
                    }}
                    type='date'
                    variant='soft'
                    color={errors?.birthday ? 'red' : 'indigo'}
                    {...register('birthday', {
                      required: 'Birthday is required field',
                    })}
                    placeholder='Birthday'
                  />
                </div>
                <div className='w-full pt-6'>
                  <ChangePassword />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-semibold'>{t('profile.about')}</h2>
            <hr />
            <div className='flex gap-5 mt-5'>
              <div className='w-full'>
                <p>{t('profile.address')}: </p>
                <TextField.Input
                  style={{
                    height: 50,
                  }}
                  variant='soft'
                  color={errors?.address ? 'red' : 'indigo'}
                  {...register('address', {
                    required: 'Address is required field',
                    maxLength: 40,
                    minLength: 4,
                  })}
                  placeholder='Address'
                />
              </div>
              <div className='w-full'>
                <p>{t('profile.city')}: </p>
                <TextField.Input
                  style={{
                    height: 50,
                  }}
                  variant='soft'
                  color={errors?.city ? 'red' : 'indigo'}
                  {...register('city', {
                    required: 'City is require field',
                    maxLength: 40,
                    minLength: 4,
                  })}
                  placeholder='City'
                />
              </div>
            </div>
          </div>
          <div className='w-full flex justify-evenly items-center'>
            <Button
              size='3'
              type='button'
              onClick={() => navigate('/profile')}
              style={{
                cursor: 'pointer',
                backgroundColor: '#F0F0F3',
                color: '#5A5E67',
              }}
            >
              {t('control.alert.cancel')}
            </Button>
            <ButtonUI title={t('control.edit.button')} type='submit' />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EditProfile;
