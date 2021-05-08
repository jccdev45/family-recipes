import React from "react";
import { Link } from "react-router-dom";

export function Hero({ name, quote, author }) {
	return (
		<div className="px-8 py-16 bg-red-100 rounded-lg">
			<h1 className="text-3xl font-bold text-center">{name}</h1>
			<h2 className="text-xl text-right">
				"{quote}"
				<Link to="" className="block text-blue-400 hover:underline">
					- {author}
				</Link>
			</h2>
		</div>
	);
}
