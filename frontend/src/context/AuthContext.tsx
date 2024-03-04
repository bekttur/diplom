import { createContext, useContext, useState } from 'react';
import { IAuthContext, User } from '../app.interface';

export const AuthContext = createContext<IAuthContext>({
  authUser: null,
  setAuthUser: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<User | null>(
    // @ts-ignore
    JSON.parse(localStorage.getItem('user')) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
