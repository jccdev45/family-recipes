import React, { useState } from "react";
import { AuthContainer } from "../../components/auth";
import { useAuth } from "../../util/contexts/AuthContext";
import { database } from "../../util/firebase/firebase";

export function AddRecipe() {
	const [name, setName] = useState("");
	const { currentUser } = useAuth();

	function handleSubmit(e) {
		e.preventDefault();

		database.recipes.add({
			name: name,
			userId: currentUser.uid,
			createdAt: database.getCurrentTimestamp(),
		});
		setName("");
	}

	return (
		<AuthContainer>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center p-10 rounded shadow-lg"
			>
				<input
					className="p-4 border border-gray-300"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button className="p-4 bg-blue-400 rounded">Submit</button>
			</form>
		</AuthContainer>
	);
}
