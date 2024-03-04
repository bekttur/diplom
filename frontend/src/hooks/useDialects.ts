import { useQuery } from '@tanstack/react-query';
import { DialectService } from '../services/dialect.service';

export const useDialects = () => {
  return useQuery({
    queryKey: ['dialects'],
    // enabled: handleDialect !== '',
    queryFn: () => DialectService.getAll(),
    select: ({ data }) => data,
    retry: 10,
  });
};
