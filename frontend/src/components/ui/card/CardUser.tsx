import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes';
import { useAuthContext } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { UsersService } from '../../../services/users.service';

const CardUser = () => {
  const { authUser } = useAuthContext();

  if (!authUser) return null;

  const [allImage, setAllImage] = useState<any[]>([]);
  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const result = await UsersService.getImage();
      setAllImage(result.data.data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
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
    <Card style={{ minWidth: 240 }}>
      <Flex gap='3' align='center'>
        {avatar ? (
          <Avatar 
            size='3'
            src={`/images/${avatar.image}`}
            radius='full'
            fallback={fallback}
          />
        ) : (
          <Avatar 
            size='3'
            radius='full'
            fallback={fallback}
          />
        )}

        <Box>
          <Text as='div' size='2' weight='bold' color='sky'>
            {authUser.fullname}
          </Text>
          <Text as='div' size='2' color='gray'>
            {authUser.email}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default CardUser;
