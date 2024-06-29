import { doc, setDoc } from "firebase/firestore";
import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { firebaseAuth, firebaseDB } from "@/utils/configs/firebase";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }

    await setDoc(doc(firebaseDB, "users", result.user.uid), {
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      phoneNumber: result.user.phoneNumber,
    });

    return result.user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
