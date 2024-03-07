import React, { ChangeEvent, useEffect, useState } from "react";
import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { socketProvider } from "../../providers/socket-provider";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
import MessageComponent from "./MessageComponent";
import classes from "./style.module.css";
import { SOCKET_URL } from "../../constants/constants";
import { chatSelector } from "../../store/chat/chat-selector";

const ChatComponent: FC = () => {
  const [message, setMessage] = useState("");
  const user = useSelector(userSelector);
  const messageList = useSelector(chatSelector);
  useEffect(() => {
    socketProvider.connect(SOCKET_URL);
    return socketProvider.disconnect;
  }, []);

  const sendMessage = () => {
    const msg = {
      text: message,
      date: Date.now(),
      sender: {
        id: user?.id!,
        name: user?.name!,
        lastname: user?.lastname!,
      },
      receiver: {
        id: "1708342082783",
        name: "John",
        lastname: "Doe",
      },
    };
    message && socketProvider.sendMessage(msg);
    setMessage("");
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  return (
    <Container className={classes.mainContainer}>
      {!!messageList.length && !!user && (
        <div className={classes.msgContainer}>
          {messageList.map((msg, index) => (
            <MessageComponent
              data={msg}
              type={msg.sender.id === user.id ? "sent" : "received"}
              key={index}
            />
          ))}
        </div>
      )}
      <InputGroup className="mt-3 mb-3">
        <InputGroup.Text>Message</InputGroup.Text>
        <Form.Control
          type="text"
          value={message}
          name="message"
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputGroup>
    </Container>
  );
};

export default ChatComponent;
