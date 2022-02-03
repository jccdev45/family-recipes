import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function userToDB(user) {
    const userRef = doc(firestore, "users", user.userId);
    return setDoc(userRef, user, { merge: true });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setIsAuthenticated(false);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateName(name) {
    return updateProfile(auth.currentUser, { displayName: name });
  }

  function updateImg(img) {
    return updateProfile(auth.currentUser, { photoURL: img });
  }

  function changeEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function changePassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    signUp,
    userToDB,
    login,
    logout,
    resetPassword,
    updateName,
    updateImg,
    changeEmail,
    changePassword,
    isAuthenticated,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
