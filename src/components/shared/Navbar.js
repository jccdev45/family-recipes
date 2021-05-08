import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FcMenu } from "react-icons/fc";

const LINK_BASE = "text-white";

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="flex flex-wrap items-center justify-between p-4 bg-blue-400">
			<NavLink to="/" className={LINK_BASE}>
				family recipes
			</NavLink>
			<nav className={isOpen ? "flex" : "hidden"}>
				<button onClick={setIsOpen}>
					<FcMenu />
				</button>
				{isOpen ? (
					""
				) : (
					<Link to="/user" className={LINK_BASE}>
						Profile
					</Link>
				)}
			</nav>
		</header>
	);
}
