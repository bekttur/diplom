import axios from 'axios';
import { IUsers } from '../app.interface';
import { APP_BACKEND_IP } from '../../appconfig';

export const UsersService = {
  async getAllUsers() {
    return await axios.get<IUsers[]>(`${APP_BACKEND_IP}/users`);
  },

  async postEditRole(_id: string, role: string) {
    return await axios.put(`${APP_BACKEND_IP}/update/userRole`, {
      _id,
      role,
    });
  },

  async getImage() {
    return await axios.get(`${APP_BACKEND_IP}/get-image`);
  },

  async putChangePassword(
    email: string,
    oldPassword: any,
    newPassword: any,
    confirmPassword: any
  ) {
    return await axios.put(`${APP_BACKEND_IP}/update/password`, {
      email,
      oldPassword,
      newPassword,
      confirmPassword,
    });
  },
};
