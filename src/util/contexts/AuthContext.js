import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	function signUp(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function userToDB(user) {
		return database.users.doc(user.userId).set(user, { merge: true });
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		setIsAuthenticated(false);
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateName(name) {
		return currentUser.updateProfile({ displayName: name });
	}

	function updateImg(img) {
		return currentUser.updateProfile({ photoURL: img });
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setIsAuthenticated(true);
			setIsLoading(false);
		});

		return unsubscribe;
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
		updateEmail,
		updatePassword,
		isAuthenticated,
		isLoading,
	};

	return (
		<AuthContext.Provider value={value}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
}
