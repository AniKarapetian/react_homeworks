import React, { useEffect } from "react";
import { BoardEventTypes } from "../../constants/constants";
import { enemyBoardProvider } from "../../providers/game-providers/enemy-board-provider";
import { gameProvider } from "../../providers/game-providers/game-provider";
import Cell from "./cell/Cell";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/login/login-selector";
export const EnemyBoard = () => {
  const [board, setBoard] = React.useState<number[][]>([]);
  const user = useSelector(userSelector);
  useEffect(() => {
    return enemyBoardProvider.eventEmitter.on(
      BoardEventTypes.ON_UPDATE,
      setBoard
    );
  }, []);

  const onClickCell = (i: number, j: number): any => {
    gameProvider.ask(i, j, user?.id!);
  };

  return (
    <div>
      Enemy board
      {board.map((row, i) => (
        <div key={i} style={{ height: "50px" }}>
          {row.map((cell, j) => (
            <Cell
              data={{ x: i, y: j, value: cell }}
              key={`cell-${i}-${j}`}
              onClick={() => {
                onClickCell(i, j);
              }}
              boardType="enemy"
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
};
