import { Avatar, Table } from '@radix-ui/themes';
import { useUsers } from '../../../hooks/useUsers';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { IUserData } from '../../../app.interface';
import { userRoleOptions } from './user.options.data';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { UsersService } from '../../../services/users.service';
import ButtonUI from '../../../components/ui/button/Button';

const EditRole = () => {
  const { data } = useUsers();

  const [usersData, setUsersData] = useState<IUserData[]>([]);
  const [allImage, setAllImage] = useState<any[]>([]);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const result = await UsersService.getImage();
    setAllImage(result.data.data);
  };

  useEffect(() => {
    if (!data) return;
    setUsersData([...data.map((elem) => ({ ...elem, isDirty: false }))]);
  }, [data]);

  const onChange = (newValue: any, userId: string) => {
    setUsersData((prevUsersData) =>
      prevUsersData.map((user) => {
        if (userId !== user._id) return user;
        return {
          ...user,
          role: newValue.value,
          isDirty: true,
        };
      })
    );
  };

  const onClick = () => {
    try {
      usersData.forEach(async ({ _id, role, isDirty }) => {
        if (!isDirty) return;
        await UsersService.postEditRole(_id, role);
        console.log('success');
      });
      toast.success('Успешно изменено');
    } catch (error) {
      console.error('Error editing user role:', error);
      toast.error(`Ошибка!!! ${error}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='w-fit h-fit flex flex-col items-center justify-center gap-5 shadow bg-white dark:bg-transparent px-20 py-5 rounded-lg'
      style={{scrollSnapAlign: 'center'}}
    >
      <div>
        <Table.Root style={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell width={50}></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={300}>
                Full name
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={350}>Email</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={200}>Role</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {usersData &&
              usersData.map((user) => {
                const userAvatar = allImage.find(
                  (elem: any) => elem.userEmail === user.email
                );
                const avatarSrc = userAvatar
                  ? `/images/${userAvatar.image}`
                  : null;
                const fallbackChar = user.fullname.charAt(0);

                return (
                    <Table.Row key={user._id}>
                      <Table.RowHeaderCell>
                        {avatarSrc ? (
                          <Avatar
                            size='2'
                            src={avatarSrc}
                            fallback={fallbackChar}
                          />
                        ) : (
                          <Avatar
                            size='2'
                            // color='amber'
                            fallback={fallbackChar}
                          />
                        )}
                      </Table.RowHeaderCell>

                      <Table.Cell color='sky'>
                        <span className='text-[#00749E] dark:text-[#76C7F0]'>
                          {user.fullname}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className='text-[#65676F] dark:text-[#B4B9C0]'>
                          {user.email}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        {user.email === 'bekttur@mail.ru' ? (
                          <p>admin</p>
                        ) : (
                          <Select
                            classNamePrefix='role-select'
                            onChange={(newValue) =>
                              onChange(newValue, user._id)
                            }
                            value={user.role}
                            // @ts-ignore
                            options={userRoleOptions}
                            placeholder={user.role}
                          />
                        )}
                      </Table.Cell>
                    </Table.Row>
                );
              })}
          </Table.Body>
        </Table.Root>
      </div>
      <div>
        <ButtonUI title='Save' type='submit' onClick={onClick} />
      </div>
    </motion.div>
  );
};

export default EditRole;
