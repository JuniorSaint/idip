import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUserForSelectProps, IUserListProps } from "../components/User/IUser";

import { api } from "../services/api";

interface IUserContext {
  userList: IUserListProps[];
  userForSelect: IUserForSelectProps[];
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [userList, setUserList] = useState<IUserListProps[]>([]);
  const [userForSelect, setUserForSelect] = useState<IUserForSelectProps[]>([]);

  useEffect(() => {
    try {
      api.get("users").then((response) => {
        setUserList(response.data);
      });
    } catch (error) {
      console.log(error.toJson());
    }
  }, []);

  useEffect(() => {
    try {
      api.get("users/all").then((response) => {
        setUserForSelect(response.data);
      });
    } catch (error) {
      console.log(error.toJson());
    }
  }, []);

  return (
    <UserContext.Provider value={{ userList, userForSelect }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContextProvider() {
  const context = useContext(UserContext);
  const { userList, userForSelect } = context;
  return { userList, userForSelect };
}
