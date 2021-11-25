import * as firebaseAuth from 'firebase/auth';

export type ChangeInput = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface IParams {
  page: string | undefined;
  id: string | undefined;
}

export interface IProfile {
  fullName: string;
  emailContact: string;
  address: string;
  phone: string;
  website: string;
  about: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  cf_password: string;
}

export interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface IAuth extends firebaseAuth.User {}
