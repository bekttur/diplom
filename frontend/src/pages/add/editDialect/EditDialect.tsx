import { Table } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useDialects } from '../../../hooks/useDialects';
import { useEffect, useState } from 'react';
import { IAllDialect } from '../../../app.interface';
import { EyeOff, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DialectService } from '../../../services/dialect.service';

const EditDialect = () => {
  const { data } = useDialects();

  console.log(data);

  const [dialectsData, setDialectsData] = useState<IAllDialect[]>([]);

  useEffect(() => {
    if (!data) return;
    setDialectsData([
      // @ts-ignore
      ...data.map((elem: IAllDialect) => ({ ...elem, isDirty: false })),
    ]);
  }, [data]);

  const deleteData = async (_id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      try {
        await DialectService.deleteDialect(_id)
        toast.success('Успешно удалено!');
        window.location.reload()
      } catch (error) {
        toast.error('Ошибка при удалении');
      }
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
        <Table.Root
          // variant='surface'
          style={{ maxHeight: 400, minHeight: 200, overflowY: 'auto' }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell width={350}>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={350}>
                Region
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={200}>
                Action
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {dialectsData &&
              dialectsData.map((item: any, index: number) => (
                <Table.Row key={index}>
                  <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
                  <Table.Cell>{item.kzRegion}</Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center gap-5'>
                      <Link to={`/add/${item._id}`}>
                        <Pencil width={16} color='#FFC100' cursor='pointer' />
                      </Link>
                      <Trash2
                        width={16}
                        color='#F56565'
                        onClick={() => deleteData(item._id, item.title)}
                        cursor='pointer'
                      />
                      {/* <EyeOff width={16} color='#20B2AA' cursor='pointer' /> */}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </div>
      {/* <div>
        <Button title='Save' type='submit' onClick={() => {}} />
      </div> */}
    </motion.div>
  );
};

export default EditDialect;
