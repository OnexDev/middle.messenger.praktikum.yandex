import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import router from '../utils/Router';
import { Routes } from '../index';
import store from '../utils/Store';

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  public async signIn(data: SigninData) {
    try {
      await this.api.signin(data);
      router.go(Routes.PROFILE);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async signUp(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.MESSENGER);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async fetchUser() {
    try {
      const user = await this.api.read();
      store.set('user', user);
    } catch (e) {
      router.go(Routes.INDEX);
      throw new Error(e);
    }
  }

  public async logout() {
    try {
      await this.api.logout();
      router.go(Routes.INDEX);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
