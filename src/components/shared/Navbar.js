import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { useAuth } from "../../util/contexts/AuthContext";

const LINK_BASE =
	"text-white lg:mx-2 lg:px-2 py-1 text-lg lg:text-xl hover:underline";
const LINK_ACTIVE = "underline px-2 lg:px-0 rounded bg-blue-200 bg-opacity-50 ring-opacity-50 ring-2 ring-offset-2 ring-offset-gray-300";

export function Navbar() {
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState("");

	async function handleLogout() {
		setError("");
		try {
			await logout();
			history.push("/login");
		} catch (error) {
			setError(error);
		}
	}

	return (
		<header className="sticky top-0 z-20 flex flex-wrap items-center justify-between p-4 bg-blue-400">
			{error && <h1>{error}</h1>}
			<div className="container relative flex flex-wrap items-center justify-between mx-auto lg:flex-nowrap">
				<div className="relative flex justify-between w-full lg:static lg:block lg:justify-start">
					<NavLink exact to="/" className={LINK_BASE} activeClassName={LINK_ACTIVE}>
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
							activeClassName={LINK_ACTIVE}
							className={LINK_BASE}
							to="/about"
						>
							About
						</NavLink>
						<NavLink
							exact
							activeClassName={LINK_ACTIVE}
							className={LINK_BASE}
							to="/recipes"
						>
							Recipes
						</NavLink>

						{currentUser ? (
							<>
								<NavLink
									activeClassName={LINK_ACTIVE}
									className={LINK_BASE}
									to="/new-recipe"
								>
									Add Recipe
								</NavLink>
								<NavLink
									activeClassName={LINK_ACTIVE}
									className={LINK_BASE}
									to="/user"
								>
									Profile
								</NavLink>
								<button className={LINK_BASE} onClick={handleLogout}>
									Log Out
								</button>
							</>
						) : (
							<NavLink
								activeClassName={LINK_ACTIVE}
								to="/login"
								className={LINK_BASE}
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
