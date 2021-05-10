import React, { useCallback, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { ProgressBar } from "../../components/recipes/ProgressBar";
import { useAuth } from "../../util/contexts/AuthContext";
import { useStorage } from "../../util/hooks/useStorage";

const types = ["image/png", "image/jpg", "image/jpeg"];

export function UpdateProfile() {
	const displayNameRef = useRef();
	const emailRef = useRef();
	const photoRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();
	const { currentUser, updatePassword, updateEmail, updateNameImg } = useAuth();
	const [error, setError] = useState("");
	const [file, setFile] = useState(null);
	const { url } = useStorage(file);
	const [loading, toggleIsLoading] = useState(false);
	const history = useHistory();

	const memoizedSetFile = useCallback(() => {
		setFile();
	}, []);

	function handleChange(e) {
		const selected = e.target.files[0];

		if (selected && types.includes(selected.type)) {
			setFile(selected);
			setError("");
		} else {
			setFile(null);
			setError("Please select a valid image type (png, jpg, jpeg)");
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setError("Passwords do not match");
		}

		const promises = [];
		toggleIsLoading(true);
		setError("");

		promises.push(updateNameImg(displayNameRef.current.value, url));

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				toggleIsLoading(false);
				history.push("/user");
			})
			.catch(() => {
				setError("Failed to update account");
			});
		// .finally(() => {
		// 	toggleIsLoading(false);
		// });
	}

	return (
		<AuthContainer>
			<div className="flex flex-col w-full p-8 rounded shadow">
				<h2 className="mb-4 text-3xl font-bold text-center">Update Profile</h2>
				{error && <h1>{error}</h1>}
				<img
					src={currentUser.photoURL}
					alt={currentUser.displayName}
					className="w-1/2 mx-auto"
				/>
				<form
					action=""
					className="flex flex-col items-center w-full mx-auto"
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="displayName"
						className="flex flex-col justify-start w-full my-2 text-lg rounded"
					>
						<span>Display Name</span>
						<input
							ref={displayNameRef}
							type="text"
							defaultValue={currentUser.displayName}
							className="p-4 border border-gray-300 rounded"
						/>
					</label>
					<label
						htmlFor="email"
						className="flex flex-col justify-start w-full my-2 text-lg rounded"
					>
						<span>Email</span>
						<input
							ref={emailRef}
							type="email"
							defaultValue={currentUser.email}
							className="p-4 border border-gray-300 rounded"
						/>
					</label>
					<label
						htmlFor="img"
						className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
					>
						<span>Photo</span>
						<input
							ref={photoRef}
							onChange={handleChange}
              defaultValue={url}
							type="file"
							className="p-4 border border-gray-300 rounded"
						/>
						{error && (
							<div className="p-4 mx-auto my-2 text-center text-white bg-red-400 rounded-lg">
								{error}
							</div>
						)}
						{file && (
							<ProgressBar file={file} memoizedSetFile={memoizedSetFile} />
						)}
						{url && <img src={url} className="mx-auto rounded-lg w-36" />}
					</label>
					<label
						htmlFor="password"
						className="flex flex-col justify-start w-full my-2 text-lg rounded"
					>
						<span>Password</span>
						<input
							ref={passwordRef}
							type="password"
							placeholder="Leave blank to keep the same"
							className="p-4 border border-gray-300 rounded"
						/>
					</label>
					<label
						htmlFor="passwordConfirmation"
						className="flex flex-col justify-start w-full my-2 text-lg rounded"
					>
						<span>Confirm Password</span>
						<input
							ref={confirmPasswordRef}
							type="password"
							placeholder="Leave blank to keep the same"
							className="p-4 border border-gray-300 rounded"
						/>
					</label>
					<button
						disabled={loading}
						className="px-5 py-3 text-xl text-white bg-blue-500 rounded"
					>
						Update
					</button>
				</form>
			</div>
			<div className="p-3 my-4 text-white bg-red-400 rounded hover:bg-red-500">
				<Link to="/user">Cancel</Link>
			</div>
		</AuthContainer>
	);
}
