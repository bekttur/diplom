import { useState, useEffect } from 'react';
import {
  TextField,
  Table,
  Dialog,
  AlertDialog,
  Button,
  Flex,
} from '@radix-ui/themes';
import { Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import { DialectService } from '../../../services/dialect.service';
import EditDialectPage from './editDialectPage/EditDialectPage';
import AddDialect from '../addDialect/AddDialect';
import ButtonUI from '../../../components/ui/button/Button';
import { IAllDialect } from '../../../app.interface';

const EditDialect = () => {
  const { t } = useTranslation('translation');
  const [title, setTitle] = useState<string>('');
  const [dialectsData, setDialectsData] = useState<IAllDialect[]>([]);
  const [filteredDialects, setFilteredDialects] = useState<IAllDialect[]>([]);

  const fetchData = async () => {
    try {
      const response = await DialectService.getAll();
      setDialectsData(response.data);
      setFilteredDialects(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = dialectsData.filter((dialect) =>
      dialect.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDialects(filtered);
  };

  const deleteData = async (_id: string) => {
    try {
      await DialectService.deleteDialect(_id);
      toast.success('Успешно удалено!');
      const updatedDialects = dialectsData.filter(
        (dialect) => dialect._id !== _id
      );
      setDialectsData(updatedDialects);
      handleSearch(title);
      fetchData()
    } catch (error) {
      toast.error('Ошибка при удалении');
    }
  };

  const getRegionValue = (item: IAllDialect) => {
    if (!!item.region) {
      return item.region
        .map((region) => t(`statistic.regions.${region}`))
        .join(', ');
    }
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='w-fit h-fit flex flex-col items-center justify-center gap-5 shadow bg-white dark:bg-transparent px-20 py-5 rounded-lg'
      style={{ scrollSnapAlign: 'center' }}
    >
      <div className='w-full flex items-center justify-center'>
        <TextField.Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleSearch(e.target.value);
          }}
          style={{ width: 300 }}
          size='2'
          placeholder='Search…'
        />
      </div>
      <div>
        <Table.Root style={{ maxHeight: 400, overflowY: 'auto' }}>
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
            {filteredDialects.map((item: IAllDialect, index: number) => (
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
                        <Dialog.Title>{t('control.edit.title')}</Dialog.Title>
                        <Dialog.Description size='2' mb='4'>
                          {t('control.edit.enter')}
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
                        <AlertDialog.Title>
                          {t('control.alert.deleteTitle')}
                        </AlertDialog.Title>
                        <AlertDialog.Description size='2'>
                          {t('control.alert.deleteDescription')}
                        </AlertDialog.Description>
                        <Flex gap='3' mt='4' justify='end'>
                          <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>
                              {t('control.alert.cancel')}
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              variant='solid'
                              color='red'
                              // @ts-ignore
                              onClick={() => deleteData(item._id)}
                            >
                              {t('control.alert.delete')}
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
            <Dialog.Title>{t('control.add.addTitle')}</Dialog.Title>
            <Dialog.Description size='2' mb='4'>
              {t('control.add.enter')}
            </Dialog.Description>
            <div className='w-full flex items-start justify-center'>
              <AddDialect />
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </motion.div>
  );
};

export default EditDialect;
