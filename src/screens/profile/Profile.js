import React from "react";
import { Link } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { useAuth } from "../../util/contexts/AuthContext";

export function Profile() {
	const { currentUser } = useAuth();

	return (
		<AuthContainer>
			<div className="flex flex-col w-full p-8 rounded shadow">
				<h2 className="mb-4 text-3xl font-bold text-center">Profile</h2>
				<img src={currentUser.photoURL} className="w-1/2 mx-auto rounded-lg" alt="" />
				<span className="text-xl">
					<strong>Display Name:</strong> {currentUser.displayName}
				</span>
				<span className="text-xl">
					<strong>Email:</strong> {currentUser.email}
				</span>
			</div>
			<Link
				to="/update-profile"
				className="w-2/3 p-4 mx-auto mt-3 text-lg text-center text-white bg-blue-500 rounded lg:w-1/2"
			>
				Update Profile
			</Link>
		</AuthContainer>
	);
}
