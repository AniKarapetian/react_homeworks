import React, { useEffect } from "react";
import { FC } from "react";
import { SelfBoard } from "./SelfBoard";
import { EnemyBoard } from "./EnemyBoard";
import { gameProvider } from "../../providers/game-providers/game-provider";

const Battleship: FC = () => {
  useEffect(() => {
    gameProvider.init();
  }, []);
  return (
    <div
      className="m-3"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <SelfBoard />
      <EnemyBoard />
    </div>
  );
};

export default Battleship;
