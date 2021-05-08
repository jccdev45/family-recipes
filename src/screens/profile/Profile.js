import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { useAuth } from "../../contexts/AuthContext";

export function Profile() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <AuthContainer>
      <div className="flex flex-col w-full p-8 rounded shadow">
        <h2 className="mb-4 text-3xl font-bold text-center">Profile</h2>
        {error && <h1>Error</h1>}
        <strong>Email:</strong> {currentUser.email}
        <Link
          to="/update-profile"
          className="w-full p-4 mt-3 text-lg text-center text-white bg-blue-500 rounded"
        >
          Update Profile
        </Link>
      </div>
      <div className="my-4 text-xl">
        <button
          onClick={handleLogout}
          className="px-6 py-4 text-white bg-blue-500 rounded"
        >
          Log Out
        </button>
      </div>
    </AuthContainer>
  );
}
