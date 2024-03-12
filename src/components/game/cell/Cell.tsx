import React, { useState } from "react";
import classes from "./cell.module.css";

type CellProps = {
  data: {
    value: number | string;
    x: number;
    y: number;
  };
  onClick?: VoidFunction;
  boardType?: string;
};

type Style = { [key: string]: string };

const Cell: React.FC<CellProps> = ({ data, onClick, boardType }) => {
  const [clicked, setClicked] = useState(false);
  const backgroundColors: Style = {
    "0": "white",
    "1": boardType === "enemy" ? "white" : "blue",
    "2": "black",
    "3": "orange",
    "4": "red",
  };
  const handleClick = () => {
    if (boardType === "enemy") {
      if (!clicked) {
        onClick && onClick();

        setClicked(true);
      }
    } else {
      onClick && onClick();
    }
  };
  return (
    <div
      onClick={handleClick}
      className={classes.cell}
      style={{
        backgroundColor: backgroundColors[String(data.value)],
      }}
    >
      <span
        style={{
          visibility: data.value == "Q" ? "visible" : "hidden",
        }}
      >
        {data.value}
      </span>
    </div>
  );
};

export default Cell;
