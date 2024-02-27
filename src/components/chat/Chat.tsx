import React, { ChangeEvent, useEffect, useState } from "react";
import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { socketProvider } from "../../providers/socket-provider";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import MessageComponent from "./MessageComponent";

const url = "http://localhost:3003";
const ChatComponent: FC = () => {
  const [message, setMessage] = useState("");
  const user = useSelector(userSelector);
  const messages = [
    {
      text: "hi Adam",
      date: 1708692729866,
      user: { name: "John", lastname: "Doe" },
    },
    {
      text: "hello John",
      date: 1708692783775,
      user: { name: "Adam", lastname: "Smith" },
    },
  ];
  useEffect(() => {
    socketProvider.connect(url);
    return socketProvider.disconnect;
  }, []);

  const sendMessage = () => {
    message &&
      socketProvider.sendMessage({
        text: message,
        date: Date.now(),
        senderId: user!.id,
        receiverId: "1708342082783",
      });
    setMessage("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  return (
    <Container className="p-4">
      <Container>
        {messages.map((msg, index) => (
          <MessageComponent data={msg} type="received" key={index} />
        ))}
      </Container>
      <InputGroup className="mb-3">
        <InputGroup.Text>Message</InputGroup.Text>
        <Form.Control
          type="text"
          value={message}
          name="message"
          onChange={handleChange}
        />
      </InputGroup>
      <Button onClick={sendMessage}>Send</Button>
    </Container>
  );
};

export default ChatComponent;
