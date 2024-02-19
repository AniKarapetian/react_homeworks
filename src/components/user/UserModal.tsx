import React, { ChangeEvent, useState } from "react";
import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserData } from "../../types/types";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
interface ModalProps {
  data: UserData;
  onSave: (user: UserData) => void;
  onCancel: () => void;
}

const UserModal: FC<ModalProps> = ({ data, onCancel, onSave }) => {
  const [user, setUser] = useState<UserData>({ ...data });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show onHide={onCancel}>
        <Modal.Header>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Name</InputGroup.Text>
            <Form.Control
              type="text"
              value={user.name}
              name="name"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Lastname</InputGroup.Text>
            <Form.Control
              type="text"
              value={user.lastname}
              name="lastname"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <Form.Control
              type="email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Age</InputGroup.Text>
            <Form.Control
              type="number"
              value={user.age}
              name="age"
              onChange={handleChange}
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => onSave(user)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserModal;
