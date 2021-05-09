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
				<strong>Display Name:</strong> {currentUser.displayName}
				<strong>Email:</strong> {currentUser.email}
				<Link
					to="/update-profile"
					className="w-2/3 p-4 mx-auto mt-3 text-lg text-center text-white bg-blue-500 rounded lg:w-1/2"
				>
					Update Profile
				</Link>
			</div>
		</AuthContainer>
	);
}
