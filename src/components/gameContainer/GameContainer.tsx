import { collection, query } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase/firebaseConfig";
import { Player, PlayerType } from "../player/Player";

export const GameContainer = () => {
  const playersRef = collection(firestore, "players");
  const q = query(playersRef);
  const [players] = useCollectionData(q);

  return (
    <div className="game-container">
      {players &&
        players.length &&
        players.map((player, index) => (
          <Player
            key={player.id}
            skin={`m${index}`}
            player={player as PlayerType}
          />
        ))}
    </div>
  );
};
