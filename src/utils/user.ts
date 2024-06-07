export interface IUser {
  contactPreferential: string;
  creationDate: string;
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  flag: string;
  language: string;
  lastAcess: string;
  lastName:string;
  perfilAcess: string[];
  phone: string;
  status: string;
}

export interface IPerfil {
  label: string;
  value: string;
}

export interface ICoutries {
  name: string;
  code: string;
  flag: string;
  mask: string;
}
