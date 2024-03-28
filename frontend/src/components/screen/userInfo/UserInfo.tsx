import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { UsersService } from '../../../services/users.service';
import { Avatar } from '@radix-ui/themes';
import ButtonUI from '../../ui/button/Button';

const UserInfo = () => {
  const { t } = useTranslation('translation');

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
          <img className='w-1/1 h-1/1 rounded-xl' width={250} src={`/images/${avatar.image}`} />
        ) : (
          <Avatar
            style={{ width: 250, height: 250 }}
            size='8'
            // radius="full"
            fallback={fallback}
          />
        )}
      </div>
      <div className='w-1/1 flex items-center justify-center mt-5'>
          <ButtonUI
            title={t('profile.editButton')}
            onClick={() => navigate('/edit-profile')}
            type='submit'
          />
        </div>
    </div>
  );
};

export default UserInfo;
