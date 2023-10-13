import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_DB } from "./firebaseConfig";

export const registerUser = async (email, password, displayName) => {
  try {
    const auth = getAuth(FIREBASE_APP);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    const user = userCredential.user;

    const usersCollection = collection(FIREBASE_DB, "users");
    const userDoc = doc(usersCollection, user.uid);

    await setDoc(userDoc, {
      name: displayName,
      email: email,
      password: password,
    });

    return user;
  } catch (error) {
    return { error: error.message };
  }
};
