import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { useAuth } from "../../util/contexts/AuthContext";

export function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, toggleIsLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      toggleIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      toggleIsLoading(false);
      history.push("/user");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <AuthContainer>
      <div className="flex flex-col w-full p-8 rounded shadow">
        <h2 className="mb-4 text-3xl font-bold text-center">Log In</h2>
        {error && <h1>{error}</h1>}
        <form
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
          <label
            htmlFor="password"
            className="flex flex-col justify-start w-full my-4 text-lg rounded"
          >
            <span>Password</span>
            <input
              ref={passwordRef}
              type="password"
              className="p-4 border border-gray-300 rounded"
              required
            />
          </label>
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-4 text-white bg-blue-500 rounded"
          >
            Log In
          </button>
        </form>
        <div className="mt-3 text-xl text-center text-blue-400 underline">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      <div className="my-4 text-xl">
        Need an account?{" "}
        <Link to="/signup" className="text-blue-400 underline">
          Sign Up
        </Link>
      </div>
    </AuthContainer>
  );
}
