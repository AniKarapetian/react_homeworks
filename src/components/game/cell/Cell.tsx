import React from "react";
import classes from "./cell.module.css";

type CellProps = {
  data: {
    value: number;
    x: number;
    y: number;
  };
  onClick?: VoidFunction;
};

type Style = { [key: string]: string };

const Cell: React.FC<CellProps> = ({ data, onClick }) => {
  const backgroundColors: Style = {
    "0": "white",
    "1": "blue",
    "2": "black",
  };
  const handleClick = () => {
    onClick && onClick();
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
          visibility: "hidden",
        }}
      >
        {data.value}
      </span>
    </div>
  );
};

export default Cell;
