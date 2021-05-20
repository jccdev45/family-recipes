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
			<Hero page="profile" name="Profile" />
			<AuthContainer>
				<Loading isLoading={isLoading} />
				<div className="grid w-full grid-cols-1 p-8 m-auto my-2 rounded shadow md:w-5/6 lg:grid-cols-2">
					<img
						src={
							(user && user.photoURL) || "http://loremflickr.com/500/500/user"
						}
						className="w-5/6 p-4 mx-auto lg:w-full rounded-xl"
						alt={(user && user.displayName) || "User profile"}
					/>
					<div className="w-5/6 m-auto text-xl">
						<div className="flex justify-center w-full">
							<strong className="w-1/3">Display Name:</strong>
							<span className="w-2/3">
								{(user && user.displayName) || "No name found"}
							</span>
						</div>
						<div className="flex justify-center w-full">
							<strong className="w-1/3">Email:</strong>
							<span className="w-2/3">
								{(user && user.email) || "No email found"}
							</span>
						</div>
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
