import API, { UpdatePasswordData, UserAPI, UserData } from '../api/UserAPI';
import store from '../utils/Store';
import AuthController from './AuthController';

class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  public async update(data: UserData) {
    try {
      const user = await this.api.updateProfile(data);
      store.set('user', user);
    } catch (e: any) {
      throw Error(e);
    }
  }

  public async updateAvatar(file: File) {
    try {
      const form = new FormData();
      form.append('avatar', file);

      const user = await this.api.updateAvatar(form);
      store.set('user', user);
    } catch (e: any) {
      throw Error(e);
    }
  }

  public async updatePassword(data: UpdatePasswordData) {
    try {
      await this.api.updatePassword(data);
      await AuthController.logout();
    } catch (e: any) {
      throw Error(e);
    }
  }

  public async getUser(id: number) {
    try {
      return await this.api.get(id);
    } catch (e: any) {
      throw Error(e);
    }
  }

  public async search(title:string) {
    try {
      await this.api.search({ login: title });
    } catch (e: any) {
      throw Error(e);
    }
  }
}

export default new UserController();
