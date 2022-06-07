import { deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebaseConfig";

export const SignOut = () => {
  const [user] = useAuthState(auth);

  return (
    auth.currentUser &&
    user && (
      <button
        className="signout"
        type="button"
        onClick={async () => {
          auth.signOut();
          await deleteDoc(doc(firestore, "players", user.uid));
        }}>
        Sign Out
      </button>
    )
  );
};
