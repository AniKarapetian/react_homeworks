import React, { useEffect } from "react";
import { BoardEventTypes } from "../../constants/constants";
import { selfBoardProvider } from "../../providers/game-providers/self-board-provider";
import Cell from "./cell/Cell";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
export const SelfBoard = () => {
  const [board, setBoard] = React.useState<number[][]>([]);
  const user = useSelector(userSelector);
  useEffect(() => {
    return selfBoardProvider.eventEmitter.on(
      BoardEventTypes.ON_UPDATE,
      setBoard
    );
  }, []);

  const onClickCell = (i: number, j: number): any => {
    console.log("set-ship", i, j);
  };
  return (
    <div>
      {user?.name}'s board
      {board.map((row, i) => (
        <div key={i} style={{ height: "50px" }}>
          {row.map((cell, j) => (
            <Cell
              data={{ x: i, y: j, value: cell }}
              key={uuidv4()}
              onClick={() => onClickCell(i, j)}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
};
