import React from "react";
import { FC } from "react";
import Cell from "../game/cell/Cell";
import { v4 as uuidv4 } from "uuid";
interface IChessBoardProps {
  solution: any[];
}

const ChessBoard: FC<IChessBoardProps> = ({ solution }) => {
  return (
    <div>
      {!!solution.length &&
        solution.map((row, i) => (
          <div key={i} style={{ height: "50px" }}>
            {row.split("").map((cell: string, j: number) => (
              <Cell data={{ x: i, y: j, value: cell }} key={uuidv4()}></Cell>
            ))}
          </div>
        ))}
    </div>
  );
};

export default ChessBoard;
