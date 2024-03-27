export interface IAllDialect {
  _id?:string,
  title: string;
  kzMeaning: string;
  ruMeaning: string;
  enMeaning: string;
  kzRegion: string;
  enRegion: string;
  ruRegion: string;
  hide: boolean;
  zone: string;
  __v?: number;
}

export interface IResult {
  data: IAllDialect[] | undefined;
  handleDialect: string;
  currentRegion: string[];
}

export interface ITypewriter {
  text: string;
  delay: number;
}

export interface ISearchForm {
  handleDialect: string;
  setHandleDialect: React.Dispatch<React.SetStateAction<string>>;
  resultRef: React.RefObject<HTMLDivElement>;
  currentRegion: string[];
  setCurrentRegion: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ISearch {
  search: string;
}

export interface SetDialectDataFunction {
  (data: IAllDialect): void;
}

export interface ISignUp {
  fullname: string,
  email: string,
  password: string,
  confirmPassword: string,
  role?: string,
  address: string,
	city: string,
	birthday: string,
	gender: string,
	phone: number
  
}

export interface ILogin {
  email: string,
  password: string
}

export interface IForgotPassword {
  email: string
}

export type User = {
  _id: string;
  email: string;
  fullname: string;
  role?: string;
  address: string,
  city: string,
  birthday: string,
  gender: string,
  phone: number
}

export interface IAuthContext {
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export interface IOption {
  value: string,
  label: string
}

export interface IAuthUser {
  _id: string,
  email: string,
  role: string
  fullname?: string
  address: string,
  city: string,
  birthday: string,
  gender: string,
  phone: number
}


// export interface IAuthUser {
//   role: string;
// }

export interface IUsers {
  _id: string,
  email: string,
  password: string,
  role: string,
  fullname: string
  __v: number
}

export interface IUserData extends IUsers {
  isDirty: boolean;
}

export interface IMessage {
  name: string,
  email: string,
  message: string
}

export interface Item {
  id: number;
  title: string;
  img: string;
  description: string;
}

export interface HomeProps {
  handleVisibility: (isVisible: boolean) => void;
}
