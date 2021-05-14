import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { Hero, Loading } from "../../components/shared";
import { useAuth } from "../../util/contexts/AuthContext";
import { database } from "../../util/firebase/firebase";

export function Profile() {
	const { id } = useParams();
	const { currentUser, isLoading } = useAuth();
	const [user, setUser] = useState(currentUser);

	useEffect(() => {
		if (id !== currentUser.uid) {
			return database.users
				.doc(id)
				.get()
				.then((doc) => setUser(database.formatDoc(doc)));
		}
		setUser(currentUser);
	}, [id, currentUser]);

	return (
		<>
			<Hero img="bg-hero-user" name="Profile" />
			<AuthContainer>
				<Loading isLoading={isLoading} />
				<div className="grid w-full p-8 m-auto my-2 rounded shadow md:w-5/6 lg:w-1/2">
					{/* <h2 className="mb-4 text-3xl font-bold text-center">Profile</h2> */}
					<img
						src={
							(user && user.photoURL) || "http://loremflickr.com/500/500/user"
						}
						className="p-4 rounded-full"
						alt={(user && user.displayName) || "User profile"}
					/>
					<div className="text-xl">
						<strong>Display Name:</strong>
						<span>{(user && user.displayName) || "No name found"}</span>
					</div>
					<div className="text-xl">
						<strong>Email:</strong> {(user && user.email) || "No email found"}
					</div>
				</div>
				{id === currentUser.uid && (
					<Link
						to="/update-profile"
						className="w-2/3 p-4 mx-auto my-4 mt-3 text-lg text-center text-white bg-blue-500 rounded md:w-1/3 lg:w-1/4"
					>
						Update Profile
					</Link>
				)}
			</AuthContainer>
		</>
	);
}
