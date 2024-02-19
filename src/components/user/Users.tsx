import React, { ChangeEvent, FC, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { usersSelector } from "../../store/user/user-selector";

import { fetchUsers } from "../../store/user/actions";
import UsersTable from "./UsersTable";

export const User: FC = () => {
  const users = useSelector(usersSelector);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <UsersTable users={users} />
    </div>
  );
};
