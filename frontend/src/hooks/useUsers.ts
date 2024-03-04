import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../services/users.service';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    // enabled: handleDialect !== '',
    queryFn: () => UsersService.getAllUsers(),
    select: ({ data }) => data,
    retry: 10,
  });
};
