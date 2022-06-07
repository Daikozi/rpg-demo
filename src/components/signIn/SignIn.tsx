import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

export const SignIn = () => {
  return (
    <button type="button" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
};
