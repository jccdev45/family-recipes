import React from "react";
import { Link } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { ImgWrapper } from "../../components/shared/ImgWrapper";
import { useAuth } from "../../util/contexts/AuthContext";

export function Profile() {
	const { currentUser } = useAuth();

	return (
		<AuthContainer>
			<div className="flex flex-col w-full p-8 m-auto rounded shadow md:w-5/6 lg:w-1/3">
				<h2 className="mb-4 text-3xl font-bold text-center">Profile</h2>
				<ImgWrapper>
					<img
						src={currentUser.photoURL}
						className="absolute top-0 left-0 min-w-full min-h-full p-4 rounded-full"
						alt={currentUser.displayName}
					/>
				</ImgWrapper>
				<div className="text-xl">
					<strong>Display Name:</strong> {currentUser.displayName}
				</div>
				<div className="text-xl">
					<strong>Email:</strong> {currentUser.email}
				</div>
			</div>
			<Link
				to="/update-profile"
				className="w-2/3 p-4 mx-auto mt-3 text-lg text-center text-white bg-blue-500 rounded md:w-1/3 lg:w-1/4"
			>
				Update Profile
			</Link>
		</AuthContainer>
	);
}
