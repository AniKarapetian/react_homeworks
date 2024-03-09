import React, { useEffect } from "react";
import { BoardEventTypes } from "../../constants/constants";
import { enemyBoardProvider } from "../../providers/game-providers/enemy-board-provider";
import { gameProvider } from "../../providers/game-providers/game-provider";
import { v4 as uuidv4 } from "uuid";
import Cell from "./cell/Cell";
export const EnemyBoard = () => {
  const [board, setBoard] = React.useState<number[][]>([]);

  useEffect(() => {
    return enemyBoardProvider.eventEmitter.on(
      BoardEventTypes.ON_UPDATE,
      setBoard
    );
  }, []);

  const onClickCell = (i: number, j: number): any => {
    gameProvider.ask(i, j, "1708342082783");
  };

  return (
    <div>
      Enemy board
      {board.map((row, i) => (
        <div key={i} style={{ height: "50px" }}>
          {row.map((cell, j) => (
            <Cell
              data={{ x: i, y: j, value: cell }}
              key={uuidv4()}
              onClick={() => {
                onClickCell(i, j);
              }}
            ></Cell>
          ))}
        </div>
      ))}
    </div>
  );
};
