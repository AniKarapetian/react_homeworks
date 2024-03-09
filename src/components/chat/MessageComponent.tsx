import React, { FC, useEffect, useState } from "react";
import classes from "./style.module.css";
import { IMessage } from "../../types/types";
interface MessageProps {
  data: IMessage;
  userId: string;
}

const MessageComponent: FC<MessageProps> = ({ data, userId }) => {
  const [type, setType] = useState("received");
  const [msgAuthor, setMsgAuthor] = useState<{
    id?: string;
    name?: string;
    lastname?: string;
  }>({});
  useEffect(() => {
    data.sender.id === userId && setType("sent");
    setMsgAuthor(data.sender);
  }, [userId]);
  return (
    <div>
      {data && (
        <div className={classes[`${type}-box`]}>
          <span className={classes.info}>
            <b>
              {msgAuthor.name} {msgAuthor.lastname}
            </b>
            {` ${new Date(data.date)}`.substring(-1, 22)}
          </span>
          <p className={classes[type]}>{data.text}</p>
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
