import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { useAuth, useNav } from "../../util/contexts";

export function Login() {
  const { isOpen, setIsOpen } = useNav();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, toggleIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    try {
      toggleIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      toggleIsLoading(false);
      history.push("/");
    } catch (error) {
      setError("Failed to log in, please try again.");
      console.log(`${error.message} (Code: ${error.code})`);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <AuthContainer>
      <div className="flex flex-col w-full p-8 rounded shadow md:w-2/3 lg:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-center">Log In</h2>
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
            className="relative flex flex-col justify-start w-full my-4 text-lg rounded"
          >
            <small className="-top-1 small">Email</small>
            <input
              ref={emailRef}
              type="email"
              className="input"
              required
              placeholder="john@doe.com"
            />
          </label>
          <label
            htmlFor="password"
            className="relative flex flex-col justify-start w-full my-4 text-lg rounded"
          >
            <small className="-top-1 small">Password</small>
            <input
              ref={passwordRef}
              type="password"
              className="input"
              required
              placeholder="hunter2"
            />
          </label>
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-4 text-lg font-bold text-white bg-blue-500 btn"
          >
            Log In
          </button>
        </form>
        <div className="mt-3 text-xl text-center text-blue-400 underline">
          <Link to="/forgot-password" className="link">
            Forgot Password?
          </Link>
        </div>
      </div>
      <div className="my-4 text-xl">
        <span>Need an account?</span>
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </div>
    </AuthContainer>
  );
}
