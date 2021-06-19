export interface IUser {
  id?: number | null;
  email:	string;
  password?:	string | null;
  firstName:	string;
  lastName:	string;
  gender:	string;
  dateOfBirth:	string;
  goal?:	string | null;
  activityLevel?:	number | null;
  isActive?:	boolean | null
  height?:	number;
  weight?:	number;
  yearsOfExperience?:	number;
  fullName?: string | null;
  phoneNumber?: string | null;
  roles?: string[];
  token?: string | null;
}
export interface IUserLogin {
  email:	string;
  password:	string;
}
