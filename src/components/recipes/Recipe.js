import React from "react";
import { Link } from "react-router-dom";

export function Recipe({ recipe }) {
	if (!recipe) return <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>;
	const { name, path, author, quote } = recipe;

	return (
		<article className="flex flex-col w-5/6 h-64 p-8 mx-auto my-4 rounded shadow-lg justify-evenly">
			<Link
				to={`/recipes/${path}`}
				className="mx-auto text-xl text-center text-blue-400 hover:underline"
			>
				{name}
			</Link>
			<div className="flex flex-col">
				<h2 className="text-lg">"{quote}"</h2>
				<Link
					className="w-full text-right text-blue-400 hover:underline"
					to="/"
				>
					- {author}
				</Link>
			</div>
		</article>
	);
}
