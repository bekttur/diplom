// @ts-ignore
import { useTranslation } from 'react-i18next';
import { AlertDialog, Button, Dialog, Flex, Table } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useDialects } from '../../../hooks/useDialects';
import { useEffect, useState } from 'react';
import { IAllDialect } from '../../../app.interface';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DialectService } from '../../../services/dialect.service';
import EditDialectPage from './editDialectPage/EditDialectPage';
import AddDialect from '../addDialect/AddDialect';
import ButtonUI from '../../../components/ui/button/Button';

const EditDialect = () => {
  const { t, i18n } = useTranslation('translation');

  const { data } = useDialects();

  const [dialectsData, setDialectsData] = useState<IAllDialect[]>([]);

  useEffect(() => {
    if (!data) return;
    setDialectsData([
      // @ts-ignore
      ...data.map((elem: IAllDialect) => ({ ...elem, isDirty: false })),
    ]);
  }, [data]);

  const deleteData = async (_id: string, title: string) => {
    try {
      await DialectService.deleteDialect(_id);
      toast.success('Успешно удалено!');
      window.location.reload();
    } catch (error) {
      toast.error('Ошибка при удалении');
    }
  };

  const getRegionValue = (item: any) => {
    // Проверяем текущий язык
    const currentLanguage = i18n.language;

    // Если текущий язык - казахский, возвращаем item.kzRegion
    if (currentLanguage === 'kz') {
      return item.kzRegion;
    }
    // В противном случае возвращаем item.enRegion
    return item.enRegion;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='w-fit h-fit flex flex-col items-center justify-center gap-5 shadow bg-white dark:bg-transparent px-20 py-5 rounded-lg'
      style={{ scrollSnapAlign: 'center' }}
    >
      <div>
        <Table.Root
          // variant='surface'
          style={{ maxHeight: 400, overflowY: 'auto' }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell width={350}>
                {t('control.dialect.title')}
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={350}>
                {t('control.dialect.region')}
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width={200}>
                {t('control.dialect.action')}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {dialectsData &&
              dialectsData.map((item: any, index: number) => (
                <Table.Row key={index}>
                  <Table.RowHeaderCell>{item.title}</Table.RowHeaderCell>
                  <Table.Cell>{getRegionValue(item)}</Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center gap-5'>
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Pencil width={16} color='#FFC100' cursor='pointer' />
                        </Dialog.Trigger>

                        <Dialog.Content style={{ maxWidth: 1100 }}>
                          <Dialog.Title>Edit Dialect</Dialog.Title>
                          <Dialog.Description size='2' mb='4'>
                            Make changes to your dialect.
                          </Dialog.Description>
                          <div className='w-full flex items-center justify-center'>
                            <EditDialectPage dialect={item} />
                          </div>
                        </Dialog.Content>
                      </Dialog.Root>

                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <Trash2 width={16} color='#F56565' cursor='pointer' />
                        </AlertDialog.Trigger>
                        <AlertDialog.Content style={{ maxWidth: 450 }}>
                          <AlertDialog.Title>Revoke access</AlertDialog.Title>
                          <AlertDialog.Description size='2'>
                            Are you sure? This application will no longer be
                            accessible and any existing sessions will be
                            expired.
                          </AlertDialog.Description>

                          <Flex gap='3' mt='4' justify='end'>
                            <AlertDialog.Cancel>
                              <Button variant='soft' color='gray'>
                                Cancel
                              </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <Button
                                variant='solid'
                                color='red'
                                onClick={() => deleteData(item._id, item.title)}
                              >
                                Delete
                              </Button>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </div>
      <div>
        <Dialog.Root>
          <Dialog.Trigger>
            <ButtonUI title={t('control.dialect.addButton')} />
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 1100 }}>
            <Dialog.Title>Add Dialect</Dialog.Title>
            <Dialog.Description size='2' mb='4'>
              Make your dialect.
            </Dialog.Description>
            <div className='w-full flex items-center justify-center'>
              <AddDialect />
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </motion.div>
  );
};

export default EditDialect;
