import React, { FC } from "react";
import classes from "./style.module.css";
import { IMessage } from "../../types/types";
interface MessageProps {
  data: IMessage;
  type: string;
}

const MessageComponent: FC<MessageProps> = ({ data, type }) => {
  return (
    <div>
      {data && (
        <div className={classes[`${type}-box`]}>
          <span className={classes.info}>
            {type === "sent" ? (
              <b>
                {data.sender.name} {data.sender.lastname}
              </b>
            ) : (
              <b>
                {data.receiver.name} {data.receiver.lastname}
              </b>
            )}
            {` ${new Date(data.date)}`.substring(-1, 22)}
          </span>
          <p className={classes[type]}>{data.text}</p>
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
