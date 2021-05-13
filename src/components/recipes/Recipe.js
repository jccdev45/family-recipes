import React from "react";
import { Link } from "react-router-dom";
import { ImgWrapper } from "../shared/ImgWrapper";

export function Recipe({ recipe }) {
	if (!recipe) return;
	const { recipeName, path, author, quote, tags, img } = recipe;

	function renderTags() {
		// const tagCopy = [tags[0], tags[1]];

		return tags.map((tag, index) => (
			<li key={index} className="px-4 m-1 text-lg bg-gray-300 rounded-xl">
				{tag}
			</li>
		));
	}

	return (
		<article className="grid w-11/12 grid-rows-2 mx-auto my-4 overflow-hidden transition-colors duration-200 ease-in-out rounded shadow-lg md:grid-rows-1 lg:grid-cols-2 md:w-3/4 lg:w-11/12 hover:bg-red-50 lg:max-h-80">
			<ImgWrapper>
				<img
					src={img}
					className="absolute top-0 left-0 min-w-full min-h-full transition-all duration-500 ease-in-out transform scale-105 bg-gray-300 hover:scale-100 filter saturate-100 hover:saturate-125"
					style={{ maxWidth: `150%` }}
					loading="lazy"
					alt={recipeName}
				/>
			</ImgWrapper>
			<div className="flex flex-col w-full h-full p-5 justify-evenly">
				<span className="w-full">
					<Link
						to={`/recipes/${path}`}
						className="text-lg text-center text-blue-400 lg:text-left lg:text-2xl hover:underline"
					>
						{recipeName}
					</Link>
				</span>
				<div className="flex flex-col">
					<h2 className="font-serif text-right">"{quote}"</h2>
					<span className="w-full text-right">
						-{" "}
						<Link className="text-lg text-blue-400 hover:underline" to="/">
							{author}
						</Link>
					</span>
					<ul className="flex flex-wrap items-center justify-around mx-auto">
						{renderTags()}
					</ul>
				</div>
			</div>
		</article>
	);
}
