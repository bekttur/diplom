import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';

import { useEffect, useState } from 'react';
import { UsersService } from '../../../services/users.service';
import { Avatar } from '@radix-ui/themes';
import ButtonUI from '../../ui/button/Button';

const UserInfo = () => {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  if (!authUser) return;

  const [allImage, setAllImage] = useState<any[]>();

  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const result = await UsersService.getImage();
    setAllImage(result.data.data || []);
  };

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

  return (
    <div className='w-1/6 h-2/3 flex flex-col justify-center items-center gap-8 leading-10'>
      <div>
        {avatar ? (
          <img className='w-1/1' width={250} src={`/images/${avatar.image}`} />
        ) : (
          <Avatar
            style={{ width: 250, height: 250 }}
            size='8'
            // radius="full"
            fallback={fallback}
          />
        )}
      </div>
      <div className='w-full'>
        <p className='text-[10px] mb-1 leading-[15px] text-gray-400'>
          Contact Information
        </p>
        <div className='w-1/1 text-xs leading-5'>
          <div className='flex items-start justify-between'>
            <p>Phone</p>
            <p className='text-[#00749E] dark:text-[#76C7F0]'>{authUser?.phone}</p>
          </div>
          <div className='w-full flex items-start justify-between flex-wrap'>
            <p>Address</p>
            <p className='text-[#00749E] dark:text-[#76C7F0]'>{authUser?.address}</p>
          </div>
          <div className='flex items-start justify-between'>
            <p>Email</p>
            <p className='text-[#00749E] dark:text-[#76C7F0]'>{authUser?.email}</p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <p className='text-[10px] mb-1 leading-[15px] text-gray-400'>
          Basic Information
        </p>
        <div className='w-[100%] text-xs leading-5'>
          <div className='flex items-start justify-between'>
            <p>Birthday</p>
            <p className='text-[#00749E] dark:text-[#76C7F0]'>{authUser?.birthday}</p>
          </div>
          <div className='w-full flex items-start justify-between flex-wrap'>
            <p>Gender</p>
            <p className='text-[#00749E] dark:text-[#76C7F0]'>{authUser?.gender}</p>
          </div>
        </div>
        <div className='w-1/1 flex items-center justify-center mt-5'>
          <ButtonUI
            title='Edit Profile'
            onClick={() => navigate('/edit-profile')}
            type='submit'
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
