import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { useAuth } from "../../util/contexts/AuthContext";
import {
	NAV_LINK_ACTIVE,
	NAV_LINK_BASE,
} from "../../data/constants/general_const";

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
					<NavLink
						exact
						to="/"
						className={NAV_LINK_BASE}
						activeClassName={NAV_LINK_ACTIVE}
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
							activeClassName={NAV_LINK_ACTIVE}
							className={NAV_LINK_BASE}
							to="/about"
						>
							About
						</NavLink>
						<NavLink
							exact
							activeClassName={NAV_LINK_ACTIVE}
							className={NAV_LINK_BASE}
							to="/recipes"
						>
							Recipes
						</NavLink>

						{currentUser ? (
							<>
								<NavLink
									activeClassName={NAV_LINK_ACTIVE}
									className={NAV_LINK_BASE}
									to="/new-recipe"
								>
									Add Recipe
								</NavLink>
								<NavLink
									exact
									activeClassName={NAV_LINK_ACTIVE}
									className={NAV_LINK_BASE}
									to={`/user/${currentUser.uid}`}
								>
									Profile
								</NavLink>
								<button className={NAV_LINK_BASE} onClick={handleLogout}>
									Log Out
								</button>
							</>
						) : (
							<NavLink
								activeClassName={NAV_LINK_ACTIVE}
								to="/login"
								className={NAV_LINK_BASE}
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
