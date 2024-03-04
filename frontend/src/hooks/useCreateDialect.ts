import { useMutation } from '@tanstack/react-query';
import { IAllDialect, SetDialectDataFunction } from '../app.interface';
import { DialectService } from '../services/dialect.service';
import toast from 'react-hot-toast';


export const useCreateDialect = (
  clearData: IAllDialect,
  setDialectData: SetDialectDataFunction
) => {
  return useMutation({
    mutationKey: ['createDialect'],
    mutationFn: (dialectData: IAllDialect) =>
      DialectService.addDialect(dialectData),
    onSuccess: () => {
      setDialectData(clearData);
      toast.success('Успешно добавлено!')
    },
  });
};
