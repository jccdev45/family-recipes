import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { useAuth, useNav } from "../../util/contexts";

export function Navbar() {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const { isOpen, setIsOpen } = useNav();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    await logout()
      .then(() => {
        history.push("/login");
      })
      .catch((err) => setError(err));
  }

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between p-4 bg-blue-400">
      {error && <h1>{error}</h1>}
      <div className="container relative flex flex-wrap items-center justify-between mx-auto lg:flex-nowrap">
        <div className="relative flex justify-between w-full lg:static lg:block lg:justify-start">
          <NavLink
            // onClick={() => setIsOpen(false)}
            exact
            to="/"
            className="link-nav"
            activeClassName="link-nav-active"
          >
            Medina Recipes
          </NavLink>
          <button
            className={`${
              isOpen ? "bg-blue-300" : ""
            } block px-2 text-2xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FcMenu />
          </button>
        </div>
        <nav
          className={
            "lg:flex flex-grow items-center fixed lg:static w-screen top-16 lg:p-0 px-4 py-2 right-0 z-20 bg-blue-400 justify-end text-right" +
            (isOpen ? " flex" : " hidden")
          }
        >
          <div className="flex flex-col items-end lg:flex-row lg:ml-auto">
            <NavLink
              // onClick={() => setIsOpen(false)}
              activeClassName="link-nav-active"
              className="link-nav"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              // onClick={() => setIsOpen(false)}
              exact
              activeClassName="link-nav-active"
              className="link-nav"
              to="/recipes"
            >
              Recipes
            </NavLink>

            {currentUser ? (
              <>
                <NavLink
                  // onClick={() => setIsOpen(false)}
                  activeClassName="link-nav-active"
                  className="link-nav"
                  to="/new-recipe"
                >
                  Add Recipe
                </NavLink>
                <NavLink
                  // onClick={() => setIsOpen(false)}
                  exact
                  activeClassName="link-nav-active"
                  className="link-nav"
                  to={`/user/${currentUser.uid}`}
                >
                  Profile
                </NavLink>
                <button className="link-nav" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <NavLink
                // onClick={() => setIsOpen(false)}
                activeClassName="link-nav-active"
                to="/login"
                className="link-nav"
              >
                Log In
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
