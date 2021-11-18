export interface IParams {
  page: string | undefined;
  id: string | undefined;
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
