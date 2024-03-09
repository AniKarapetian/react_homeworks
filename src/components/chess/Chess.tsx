import React, { useEffect, useState } from "react";
import { FC } from "react";
import { solveNQueens } from "./helper";
import ChessBoard from "./ChessBoard";
import { Button } from "react-bootstrap";

const Chess: FC = () => {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [showQueens, setShowQueens] = useState(false);
  useEffect(() => {
    setSolutions(solveNQueens(8));
  }, []);
  return (
    <div>
      <h3>8 Queens puzzle</h3>
      <Button onClick={() => setShowQueens(!showQueens)}>
        {showQueens ? "Hide" : "Show"} solutions
      </Button>
      {showQueens &&
        solutions.map((solution: any, index: number) => {
          return (
            <div key={index}>
              <p>Solution {index + 1}</p>
              <ChessBoard solution={solution} />
            </div>
          );
        })}
    </div>
  );
};

export default Chess;
