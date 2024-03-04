import { useState } from 'react';
import toast from 'react-hot-toast';
import { ISignUp } from '../app.interface';
import { useAuthContext } from '../context/AuthContext';
import { AuthService } from '../services/auth.service';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const signup = async ({
    fullname,
    email,
    password,
    confirmPassword,
    role,
    address,
    city,
    birthday,
    gender,
    phone,
  }: ISignUp) => {
    const success = handleInputErrors({
      fullname,
      email,
      password,
      confirmPassword,
      role,
      address,
      city,
      birthday,
      gender,
      phone,
    });
    if (!success) return;

    setLoading(true);

    try {
      const data = await AuthService.postSignUp(
        fullname,
        email,
        password,
        confirmPassword,
        role || 'user',
        address,
        city,
        birthday,
        gender,
        phone
      );

      console.log(data.data);

      localStorage.setItem('user', JSON.stringify(data.data));
      setAuthUser(data.data);
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

function handleInputErrors({
  fullname,
  email,
  password,
  confirmPassword,
  role,
  address,
  city,
  birthday,
  gender,
  phone,
}: ISignUp) {
  if (
    !fullname ||
    !email ||
    !password ||
    !confirmPassword ||
    !role ||
    !address ||
    !city ||
    !birthday ||
    !gender ||
    !phone
  ) {
    toast.error('Поля не заполнено');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password don't match");
    return false;
  }

  return true;
}
