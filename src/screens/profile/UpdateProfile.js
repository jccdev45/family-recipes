import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContainer } from "../../components/auth";
import { ProgressBar } from "../../components/recipes/ProgressBar";
import Button from "../../components/shared/Button";
import { useAuth, useNav } from "../../util/contexts";
import { useStorage } from "../../util/hooks/useStorage";

const types = ["image/png", "image/jpg", "image/jpeg"];

export function UpdateProfile() {
  const { isOpen, setIsOpen } = useNav();
  const displayNameRef = useRef();
  const emailRef = useRef();
  const photoRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const {
    currentUser,
    userToDB,
    changePassword,
    changeEmail,
    updateName,
    updateImg,
  } = useAuth();
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const { url } = useStorage(file);
  const [loading, toggleIsLoading] = useState(false);
  const [closed, toggleClosed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedSetFile = useCallback(() => {
    setFile();
  }, []);

  function handleChange(e) {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setError("");
      setFile(selected);
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

    const user = {
      userId: currentUser.uid,
      displayName: displayNameRef.current.value
        ? displayNameRef.current.value
        : currentUser.displayName,
      email: emailRef.current.value,
      photoURL: url ? url : currentUser.photoURL,
    };
    promises.push(userToDB(user));

    promises.push(updateName(displayNameRef.current.value));

    if (photoRef.current.value) promises.push(updateImg(url));

    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(changePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        toggleIsLoading(false);
        history.push(`/user/${currentUser.uid}`);
      })
      .catch((error) => {
        console.error("Error: ", error);
        toggleIsLoading(false);
        setError("There was an error, please try again");
      });
  }

  return (
    <AuthContainer>
      <div className="grid w-full grid-cols-1 p-8 mx-auto rounded shadow md:w-2/3 lg:w-1/2">
        <h2 className="mb-4 text-3xl font-bold text-center">Update Profile</h2>
        <div
          className={`${
            closed ? "hidden" : "block"
          } relative p-4 my-4 text-xl font-bold text-center bg-gray-100 rounded-lg shadow ring-2 ring-offset-2 ring-offset-red-200`}
        >
          <Button
            text={"x"}
            styles="absolute px-2.5 py-0.5 text-white hover:bg-red-500 bg-red-400 rounded-full -left-3 -top-1"
            action={() => toggleClosed()}
          />
          If this is your first time, please take a moment to update your
          information below
        </div>
        {error && (
          <div className="p-4 mx-auto my-2 text-center text-white bg-red-400 rounded-lg">
            {error}
          </div>
        )}
        <img
          src={currentUser.photoURL}
          alt={currentUser.displayName}
          className="mx-auto rounded-full"
        />
        <form
          className="flex flex-col items-center w-full mx-auto"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="displayName"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="small -top-1">Display Name</small>
            <input
              ref={displayNameRef}
              type="text"
              defaultValue={currentUser.displayName}
              className="input"
              required
            />
          </label>
          <label
            htmlFor="email"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="small -top-1">Email</small>
            <input
              ref={emailRef}
              type="email"
              defaultValue={currentUser.email}
              className="input"
            />
          </label>
          <label
            htmlFor="img"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="small -top-3">Photo</small>
            <input
              ref={photoRef}
              onChange={handleChange}
              defaultValue={url}
              type="file"
              className="p-4 border border-gray-300 rounded"
            />
            {file && (
              <ProgressBar file={file} memoizedSetFile={memoizedSetFile} />
            )}
            {url && (
              <img
                src={url}
                alt={currentUser.displayName}
                style={{ maxWidth: `150%` }}
                className="w-full mx-auto rounded-lg"
              />
            )}
          </label>
          <label
            htmlFor="password"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="small -top-1">Password</small>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Leave blank to keep the same"
              className="input"
            />
          </label>
          <label
            htmlFor="passwordConfirmation"
            className="relative flex flex-col justify-start w-full my-2 text-lg rounded"
          >
            <small className="small -top-1">Confirm Password</small>
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Leave blank to keep the same"
              className="input"
            />
          </label>
          <Button
            text={"Update"}
            disabled={loading}
            styles="text-xl text-white bg-blue-500 btn text-bold"
          />
        </form>
      </div>

      <Link
        to={`/user/${currentUser.uid}`}
        className="p-3 my-4 text-lg text-white bg-red-400 btn text-bold hover:bg-red-500"
      >
        Cancel
      </Link>
    </AuthContainer>
  );
}
