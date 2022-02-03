import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import Button from "../../components/shared/Button";
import { useAuth, useNav } from "../../util/contexts";

export function ForgotPassword() {
  const { isOpen, setIsOpen } = useNav();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, toggleIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await resetPassword(emailRef.current.value)
      .then((what) => {
        setMessage("");
        setError("");
        toggleIsLoading(true);
        setMessage("Check your inbox");
      })
      .catch((error) => {
        setError("Failed to reset password");
        toggleIsLoading(false);
        console.log(`${error.message} (Code: ${error.code})`);
        setTimeout(() => {
          setError("");
        }, 3000);
      });

    try {
    } catch (error) {}
    toggleIsLoading(false);
  }

  return (
    <AuthContainer>
      <div className="flex flex-col w-11/12 p-8 rounded shadow md:w-2/3 lg:w-1/2">
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
            className="relative flex flex-col justify-start w-full my-4 text-lg rounded"
          >
            <small className="small -top-1">Email</small>
            <input
              ref={emailRef}
              type="email"
              className="input"
              placeholder="john@doe.com"
              required
            />
          </label>
          <Button
            text={"Reset Password"}
            disabled={loading}
            styles="text-lg font-bold text-white bg-blue-500 btn"
            type={"submit"}
            action={(e) => handleSubmit(e)}
          />
        </form>
        <div className="mt-3 text-xl text-center text-blue-400 underline">
          <Link to="/login" className="link">
            Log In
          </Link>
        </div>
      </div>
      <div className="my-4 text-xl">
        Need an account?{" "}
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </div>
    </AuthContainer>
  );
}
