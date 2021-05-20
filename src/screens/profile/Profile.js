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
		return setUser(currentUser);
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
						className="w-full p-4 mx-auto md:w-5/6 lg:w-full rounded-xl"
						alt={(user && user.displayName) || "User profile"}
					/>
					<div className="w-5/6 m-auto text-xl divide-y-2 md:text-2xl divide-grey-300">
						<div className="flex flex-col justify-center w-full md:flex-row lg:flex-col lg:my-2">
							<strong className="w-full">Display Name:</strong>
							<span className="w-full">
								{(user && user.displayName) || "No name found"}
							</span>
						</div>
						<div className="flex flex-col justify-center w-full md:flex-row lg:flex-col lg:my-2">
							<strong className="w-full">Email:</strong>
							<span className="w-full">
								{(user && user.email) || "No email found"}
							</span>
						</div>
						{/* <div className="flex flex-col justify-center w-full md:flex-row lg:flex-col lg:my-2">
							<strong className="w-full">Last seen:</strong>
							<span className="w-full">
								{(user.metadata &&
									new Date(
										user.metadata.lastSignInTime
									).toLocaleDateString()) ||
									"?"}
							</span>
						</div>
						<div className="flex flex-col justify-center w-full md:flex-row lg:flex-col lg:my-2">
							<strong className="w-full">Member since:</strong>
							<span className="w-full">
								{(user.metadata &&
									new Date(user.metadata.creationTime).toLocaleDateString()) ||
									"?"}
							</span>
						</div> */}
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
