import "./App.css";
import { auth, firestore } from "./firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn } from "./components/signIn/SignIn";
import { SignOut } from "./components/signout/SignOut";
import { GameContainer } from "./components/gameContainer/GameContainer";
import { useEffect } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";

const App = () => {
  const [user] = useAuthState(auth);

  const addPlayer = async () => {
    if (user) {
      const playerDoc = doc(firestore, "players", user.uid);
      const playerSnap = await getDoc(playerDoc);
      if (!playerSnap.exists()) {
        setDoc(playerDoc, {
          name: user.displayName,
          id: user.uid,
          direction: 0,
          step: 0,
          x: Math.random() * (240 - 20),
          y: Math.random() * (208 - 20),
        });
      }
    }
  };

  useEffect(() => {
    addPlayer();
  }, [user]);

  return (
    <div className="App">
      {user && <SignOut />}
      {user ? <GameContainer /> : <SignIn />}
    </div>
  );
};

export default App;
