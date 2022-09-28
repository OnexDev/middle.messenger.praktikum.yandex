import BaseAPI from './BaseAPI';
import { Options } from '../utils/HTTPClient';
import { User } from './AuthAPI';

export type UserData = Omit<User, 'id'>

export interface UpdatePasswordData extends Options {
    'oldPassword': string,
    'newPassword': string
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateProfile(data: UserData): Promise<User> {
    return this.http.post('/profile', { data });
  }

  updateAvatar(data: FormData): Promise<User> {
    return this.http.post('/profile/avatar', { headers: { 'Content-Type': 'multipart/form-data' }, data });
  }

  updatePassword(data: UpdatePasswordData) {
    return this.http.post('/password', { data });
  }

  get(identifier: number): Promise<User> {
    return this.http.get(`/${identifier}`);
  }

  search(data: {login: string}): Promise<User[]> {
    return this.http.get('/search', { data });
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new UserAPI();
