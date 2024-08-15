import { useEffect, useState } from "react";
import { UserService } from "../../services/user";
import { AxiosClient } from "../../ServiceClients/AxiosClient";
import { IUser } from "../../utils/types";

export const UserList = () => {
  const [userList, setUserList] = useState<IUser[]>([]);

  const reqUserList = async () => {
    const userService = new UserService(AxiosClient);

    try {
      const users = await userService.getUserList();

      setUserList(users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    reqUserList();
  }, []);

  return (
    <div>
      {userList.map(({ name }) => (
        <h1>{name}</h1>
      ))}
    </div>
  );
};
