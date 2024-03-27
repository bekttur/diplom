import { MapPin } from 'lucide-react';
import UserInfo from '../../components/screen/userInfo/UserInfo';
import { useAuthContext } from '../../context/AuthContext';
import { Table } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Profile = ({
  handleVisibility,
}: {
  handleVisibility: (isVisible: boolean) => void;
}) => {
  const { authUser } = useAuthContext();

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
      className='w-full h-fit flex flex-col items-center justify-center'
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className='w-full h-screen flex items-center justify-center gap-20 mt-5'>
        <UserInfo />
        <div className='w-3/6 h-2/3 flex flex-col gap-5'>
          <div className='flex items-end gap-3'>
            <h1 className='text-3xl font-semibold text-[#00749E] dark:text-[#76C7F0]'>
              {authUser?.fullname}
            </h1>
            <div className='flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs'>
              <MapPin width={8} strokeWidth={2} />
              <p>{authUser?.city}</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2>History</h2>
            <div className='mt-5'>
              <Table.Root style={{ maxHeight: 400, overflowY: 'auto' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                    <Table.Cell>danilo@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                    <Table.Cell>zahra@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                    <Table.Cell>jasper@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                    <Table.Cell>danilo@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                    <Table.Cell>zahra@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                    <Table.Cell>jasper@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                    <Table.Cell>danilo@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                    <Table.Cell>zahra@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                    <Table.Cell>jasper@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                    <Table.Cell>danilo@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                    <Table.Cell>zahra@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                    <Table.Cell>jasper@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>
                </Table.Body>
                <Table.Body>
                  <Table.Row>
                    <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                    <Table.Cell>danilo@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                    <Table.Cell>zahra@example.com</Table.Cell>
                    <Table.Cell>Admin</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                    <Table.Cell>jasper@example.com</Table.Cell>
                    <Table.Cell>Developer</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
