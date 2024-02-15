import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { UserData } from "../../types/types";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user-selector";
import classes from "./style.module.css";
import {
  createUser,
  fetchUsers,
  removeUser,
  updateUser,
} from "../../store/user/actions";

export const User: FC = () => {
  const users = useSelector(userSelector);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserData>({
    id: "",
    email: "",
    name: "",
    lastname: "",
    age: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    toggleModal();
  };

  const handleEdit = (user: UserData) => {
    setUser({ ...user });
    toggleModal();
  };

  const handleSave = () => {
    if (user.id) {
      updateUser(user);
    } else {
      createUser(user);
    }
    close();
  };
  const close = () => {
    toggleModal();
    setUser({
      id: "",
      email: "",
      name: "",
      lastname: "",
      age: 0,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (id: string) => {
    removeUser(id);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleAdd}>Add</button>
      {!!users.length && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Age</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleEdit(user);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className={classes.modal}>
          <div className={classes["modal-content"]}>
            <span className={classes.close} onClick={toggleModal}>
              &times;
            </span>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={user.name}
              name="name"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              value={user.lastname}
              name="lastname"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={handleChange}
              name="email"
            />
            <br />

            <label htmlFor="age">Age</label>
            <input
              type="number"
              value={user.age}
              onChange={handleChange}
              name="age"
            />
            <br />

            <button onClick={handleSave}>Save</button>
            <button onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
