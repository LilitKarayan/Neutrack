import { WeightHistory } from "@models";

export interface IUser {
  id?: number | null;
  email:	string;
  password?:	string | null;
  firstName:	string;
  lastName:	string;
  gender?:	string;
  dateOfBirth?:	string;
  goal?:	number | null;
  activityLevel?:	number | null;
  isActive?:	boolean | null
  height?:	number;
  weight?:	number;
  yearsOfExperience?:	number;
  fullName?: string | null;
  phoneNumber?: string | null;
  roles?: string[];
  nutritionistId?: number | null;
  patientId?: number | null;
}
export interface IUserLogin {
  email:	string;
  password:	string;
}
export interface IPatient extends IUser{
  userId?: number;
  initialWeight?: number | null;
  patientActivityHistories?: WeightHistory[];
}

export interface INutritionist extends IUser{
  userId?: number
}
