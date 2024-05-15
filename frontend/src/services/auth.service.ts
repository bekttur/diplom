import axios from 'axios';
import {APP_BACKEND_IP} from "../../appconfig.ts"
import { User } from '../app.interface.ts';


export const AuthService = {
  async postLogin(email: string, password: string) {
    return await axios.post(`${APP_BACKEND_IP}/api/auth/login`, {
      email,
      password
    });
  },

  async postSignUp(
    fullname: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    address: string,
    city: string,
    birthday: string,
    gender: string,
    phone: number,
  ) {
    return await axios.post(`${APP_BACKEND_IP}/api/auth/signup`, {
      fullname,
      email,
      password,
      confirmPassword,
      role,
      address,
      city,
      birthday,
      gender,
      phone
    });
  },

  async postLogout() {
    return await axios.post(`${APP_BACKEND_IP}/api/auth/logout`)
  },


  async postForgotPass(email: string) {
    return await axios.post(`${APP_BACKEND_IP}/forgot-password`, {email})
  },

  async updateUser(data: User) {
    await axios.put(`${APP_BACKEND_IP}/update/user`, {data});
  },

};
