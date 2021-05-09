import React from "react";
import { Link } from "react-router-dom";

export function Recipe({ recipe }) {
	if (!recipe) return <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>;
	const { recipeName, path, author, quote, tags } = recipe;

	function joinTags() {
		const copy = [...tags];
		const reversed = copy.reverse();
		return reversed[0];
	}

	function renderTags() {
		return tags.map((tag, index) => (
			<li key={index} className="px-4 mx-1 text-lg bg-gray-300 rounded-xl">
				{tag}
			</li>
		));
	}

	return (
		<article className="flex flex-col justify-between max-w-lg my-4 overflow-hidden rounded shadow-lg">
			<div className="overflow-hidden">
				<img
					src={`http://loremflickr.com/300/300/${joinTags()}`}
					className="w-full transition-all duration-500 ease-in-out transform scale-105 bg-gray-300 hover:scale-100 filter saturate-100 hover:saturate-125"
					loading="eager"
					alt=""
				/>
			</div>
			<div className="flex flex-col w-full p-5">
				<Link
					to={`/recipes/${path}`}
					className="text-2xl text-blue-400 hover:underline"
				>
					{recipeName}
				</Link>
				<div className="flex flex-col">
					<h2 className="font-serif text-lg text-right">"{quote}"</h2>
					<span className="w-full text-right">
						-{" "}
						<Link className="text-blue-400 hover:underline" to="/">
							{author}
						</Link>
					</span>
					<ul className="flex items-center mx-auto overflow-x-auto">
						{renderTags()}
					</ul>
				</div>
			</div>
		</article>
	);
}
