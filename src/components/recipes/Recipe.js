import React from "react";
import { Link } from "react-router-dom";

export function Recipe({ recipe }) {
	if (!recipe) return <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>;
	const { recipeName, path, author, quote, tags, img } = recipe;

	function renderTags() {
		const tagCopy = [tags[0], tags[1]];

		return tagCopy.map((tag, index) => (
			<li key={index} className="px-4 m-1 text-lg bg-gray-300 rounded-xl">
				{tag}
			</li>
		));
	}

	return (
		<article className="flex items-center justify-between mx-auto my-4 overflow-hidden rounded shadow-lg w-2xl lg:h-72">
			<img
				src={img}
				className="w-1/3 transition-all duration-500 ease-in-out transform scale-105 bg-gray-300 lg:w-1/2 hover:scale-100 filter saturate-100 hover:saturate-125"
				loading="eager"
				alt=""
			/>
			<div className="flex flex-col w-2/3 p-5 lg:w-1/2 justify-evenly h-5/6">
				<Link
					to={`/recipes/${path}`}
					className="text-lg text-center text-blue-400 lg:text-left lg:text-2xl hover:underline"
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
					<ul className="flex items-center justify-center mx-auto overflow-x-scroll flex-nowrap lg:flex-wrap">
						{renderTags()}
					</ul>
				</div>
			</div>
		</article>
	);
}
