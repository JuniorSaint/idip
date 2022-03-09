export interface IBaseUserProps {
  id: string;
  fullName: string;
  userName: string;
  userEmail: string;
  password: string;
  passwordConfirm: string;
  userImage?: string;
  isActive: boolean;
  userType: string;
  createdAt: Date;
  birthdayDate: Date;
  age?: number;
}

export type IUserListProps = Omit<
  IBaseUserProps,
  "password" | "passwordConfirm"
>;
export type IUserProps = Omit<IBaseUserProps, "id" | "createdAt" | "age">;
export type IUserForSelectProps = Pick<IBaseUserProps, "id" | "fullName">;
