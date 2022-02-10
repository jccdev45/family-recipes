import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import Logo from "../../data/img/logo.png";
import { useAuth, useNav } from "../../util/contexts";
import Button from "./Button";

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
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between p-4 md:static bg-gradient-to-br from-blue-300 to-blue-400">
      {error && <h1>{error}</h1>}
      <div className="container relative flex flex-wrap items-center justify-between mx-auto lg:flex-nowrap">
        <div className="relative flex justify-between w-full lg:static lg:block lg:justify-start">
          <NavLink
            exact
            to="/"
            className="link-nav"
            activeClassName="link-nav-active"
          >
            <img src={Logo} alt="Recipes Site Logo" className="w-10" />
            Medina Recipes
          </NavLink>
          <Button
            styles={`${
              isOpen ? "bg-blue-300" : ""
            } block px-2 text-2xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none`}
            action={() => setIsOpen(!isOpen)}
          >
            <FcMenu />
          </Button>
        </div>
        <nav
          className={
            "lg:flex flex-grow items-center fixed lg:static w-screen top-16 lg:p-0 px-4 py-2 right-0 z-20 md:w-1/3 md:rounded-b from-blue-300 bg-gradient-to-tr to-blue-400 md:bg-gradient-to-r md:from-blue-400/90 lg:from-transparent lg:to-transparent lg:w-full md:to-blue-400/80 justify-end text-right" +
            (isOpen ? " flex" : " hidden")
          }
        >
          <div className="flex flex-col items-end lg:flex-row lg:ml-auto">
            <NavLink
              activeClassName="link-nav-active"
              className="link-nav"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
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
                  activeClassName="link-nav-active"
                  className="link-nav"
                  to="/new-recipe"
                >
                  Add Recipe
                </NavLink>
                <NavLink
                  exact
                  activeClassName="link-nav-active"
                  className="link-nav"
                  to={`/user/${currentUser.uid}`}
                >
                  Profile
                </NavLink>
                <Button
                  styles="text-white bg-red-400 mt-3 md:mt-0 link-nav"
                  action={() => handleLogout()}
                  text="Log Out"
                />
              </>
            ) : (
              <NavLink
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
