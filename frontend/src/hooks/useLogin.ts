import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { AuthService } from '../services/auth.service';

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const login = async (email: string, password: string) => {

	const success = handleInputErrors(email, password);
	  if (!success) return;

    setLoading(true);

    try {
      const data = await AuthService.postLogin(email, password)

      console.log(data.data);
	  localStorage.setItem('user', JSON.stringify(data.data))
	  setAuthUser(data.data)

    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {loading, login}
};

export default useLogin;






function handleInputErrors(email: string, password: string) {

	if (!email || !password) {
	  toast.error('Поля не заполнено');
	  return false;
	}

	return true;
  }
  