import BaseAPI from './BaseAPI';
import { Options } from '../utils/HTTPClient';

export interface SigninData extends Options{
    login: string;
    password: string;
}

export interface SignupData extends Options{
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    avatar: string;
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  signup(data: SignupData) {
    return this.http.post('/signup', data);
  }

  read(): Promise<unknown> {
    return Promise.resolve(undefined);
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthAPI();
