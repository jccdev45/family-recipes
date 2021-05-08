import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { useAuth } from "../../util/contexts/AuthContext";

export function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, toggleIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    toggleIsLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        toggleIsLoading(false);
      });
  }

  return (
    <AuthContainer>
      <div className="flex flex-col w-full p-8 rounded shadow">
        <h2 className="mb-4 text-3xl font-bold text-center">Update Profile</h2>
        {error && <h1>{error}</h1>}
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
              defaultValue={currentUser.email}
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
              placeholder="Leave blank to keep the same"
              className="p-4 border border-gray-300 rounded"
              required
            />
          </label>
          <label
            htmlFor="passwordConfirmation"
            className="flex flex-col justify-start w-full my-4 text-lg rounded"
          >
            <span>Confirm Password</span>
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Leave blank to keep the same"
              className="p-4 border border-gray-300 rounded"
              required
            />
          </label>
          <button
            disabled={loading}
            className="px-6 py-4 text-xl text-white bg-blue-500 rounded"
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
