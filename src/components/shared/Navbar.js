import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FcMenu } from "react-icons/fc";
import { useAuth } from "../../util/contexts/AuthContext";

const LINK_BASE = "text-white mx-2 p-2 text-xl hover:underline";

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
		<nav className="sticky top-0 z-10 flex flex-wrap items-center justify-between p-4 bg-blue-400">
			{error && <h1>{error}</h1>}
			<div className="container relative flex flex-wrap items-center justify-between px-4 mx-auto lg:flex-nowrap">
				<div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
					<NavLink to="/" className={LINK_BASE}>
						family recipes
					</NavLink>
					<button
						className="block text-2xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
						type="button"
						onClick={() => setIsOpen(!isOpen)}
					>
						<FcMenu />
					</button>
				</div>
				<div
					className={
						"lg:flex flex-grow items-center fixed lg:static w-screen top-16 lg:p-0 p-4 right-0 z-10 bg-blue-400 justify-end text-right" +
						(isOpen ? " flex" : " hidden")
					}
				>
					<div className="flex flex-col lg:flex-row lg:ml-auto">
						<NavLink
							exact
							activeClassName="underline bg-blue-200 rounded text-blue-500"
							className={LINK_BASE}
							to="/"
						>
							Recipes
						</NavLink>

						{currentUser ? (
							<>
								<NavLink
									activeClassName="underline bg-blue-200 rounded text-blue-500"
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
								activeClassName="underline bg-blue-200 rounded text-blue-500"
								to="/login"
								className={LINK_BASE}
							>
								Log In
							</NavLink>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
