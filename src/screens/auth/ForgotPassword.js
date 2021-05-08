import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ForgotPassword() {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, toggleIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			toggleIsLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox");
		} catch (error) {
			setError("Failed to reset password");
		}
		toggleIsLoading(false);
	}

	return (
		<section className="container flex flex-col items-center max-w-xl">
			<div className="flex flex-col w-full p-8 rounded shadow">
				<h2 className="mb-4 text-3xl font-bold text-center">Password reset</h2>
				{error && <h1>{error}</h1>}
				{message && <h1>{message}</h1>}
				<form
					action=""
					className="flex flex-col items-center w-full mx-auto"
					onSubmit={handleSubmit}
				>
					<label
						htmlFor="email"
						className="flex flex-col justify-start w-full my-4 text-lg rounded"
					>
						<span>Email</span>
						<input
							ref={emailRef}
							type="email"
							className="p-4 border border-gray-300 rounded"
							required
						/>
					</label>
					<button
						disabled={loading}
						className="px-6 py-4 text-white bg-blue-500 rounded"
					>
						Reset Password
					</button>
				</form>
				<div className="mt-3 text-xl text-center text-blue-400 underline">
					<Link to="/login">Log In</Link>
				</div>
			</div>
			<div className="my-4 text-xl">
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</section>
	);
}
