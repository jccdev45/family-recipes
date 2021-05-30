import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { useAuth, useNav } from "../../util/contexts";

export function Signup() {
  const { isOpen, setIsOpen } = useNav();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signUp } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, toggleIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    setError("");
    try {
      toggleIsLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      toggleIsLoading(false);
      history.push("/update-profile");
    } catch {
      setError("Failed to create an account");
    }
  }

  return (
    <AuthContainer>
      <div className="flex flex-col w-full p-8 rounded shadow md:w-2/3 lg:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-center">Sign Up</h2>
        {error && (
          <h1 className="w-full p-8 font-bold text-center text-white bg-red-400 rounded-lg">
            {error}
          </h1>
        )}
        <form
          className="flex flex-col items-center w-full mx-auto"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="email"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="-top-1 small">Email</small>
            <input
              ref={emailRef}
              type="email"
              className="input"
              placeholder="john@doe.com"
              required
            />
          </label>
          <label
            htmlFor="password"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="-top-1 small">Password</small>
            <input
              ref={passwordRef}
              type="password"
              className="input"
              placeholder="hunter2"
              required
            />
          </label>
          <label
            htmlFor="passwordConfirmation"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="-top-1 small">Confirm Password</small>
            <input
              ref={confirmPasswordRef}
              type="password"
              className="input"
              placeholder="hunter2"
              required
            />
          </label>
          <button
            disabled={loading}
            className="px-6 py-4 text-lg font-bold text-white bg-blue-500 btn"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="my-4 text-xl">
        <span>Already have an account?</span>
        <Link to="/login" className="link">
          Log In
        </Link>
      </div>
    </AuthContainer>
  );
}
