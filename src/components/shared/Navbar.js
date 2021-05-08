import React from "react";
import { Link, NavLink } from "react-router-dom";

const LINK_BASE = "text-white";

export function Navbar() {
	return (
		<header className="flex items-center justify-between p-4 bg-blue-400">
			<NavLink to="/" className={LINK_BASE}>
				family recipes
			</NavLink>
			<nav>
				<Link to="/user" className={LINK_BASE}>
					Profile
				</Link>
			</nav>
		</header>
	);
}
