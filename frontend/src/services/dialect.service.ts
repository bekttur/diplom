import axios from 'axios';
import { IAllDialect } from '../app.interface';
import { APP_BACKEND_IP } from '../../appconfig';

export const DialectService = {
  async getAll() {
    return await axios.get<IAllDialect[]>(`${APP_BACKEND_IP}/data`);
  },

  async addDialect(dialectData: IAllDialect) {
    axios.post(`${APP_BACKEND_IP}/add`, dialectData);
  },

  async updateDialect(dialectData: IAllDialect) {
    await axios.put(`${APP_BACKEND_IP}/update/dialect`, {dialectData});
  },

  async deleteDialect(_id: string) {
    await axios.delete(`${APP_BACKEND_IP}/delete/dialect/${_id}`);
  }
};
