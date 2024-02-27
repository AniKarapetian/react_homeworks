import React, { FC } from "react";
import { Message } from "../../types/types";

interface MessageProps {
  data: any;
  type: string;
}

const MessageComponent: FC<MessageProps> = ({ data, type }) => {
  return (
    <div>
      <p>
        {data.user.name} {data.user.lastname}{" "}
        {`${new Date(data.date)}`.substring(-1, 21)}
      </p>
      <p>{data.text}</p>
    </div>
  );
};

export default MessageComponent;
