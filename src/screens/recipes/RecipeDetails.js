import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Checkbox } from "../../components/recipes";
import { Hero } from "../../components/shared";
import { useRecipe } from "../../util/hooks/useRecipe";

export function RecipeDetails() {
	const { recipePath } = useParams();
	const { recipes, isLoading } = useRecipe();
	const [recipe, setRecipe] = useState({});

	useEffect(() => {
		if (!recipes) return;
		function getRecipeDetails() {
			recipes.find((rec) => {
				return rec.path === recipePath ? setRecipe(rec) : null;
			});
		}

		getRecipeDetails();
	}, [recipePath, recipes]);

	function renderLoading() {
		return (
			<div
				className={`${
					isLoading ? "block" : "hidden"
				} grid place-items-center fixed top-0 left-0 min-h-screen w-screen`}
				style={{ backgroundColor: `rgba(0, 0, 0, 0.25)` }}
			>
				<h1 className="p-24 text-3xl text-black bg-white rounded">
					LOADING...
				</h1>
			</div>
		);
	}

	function renderRecipe() {
		if (!recipe) return;

		const { name, author, steps, tags, quote, ingredients } = recipe;

		function renderTags() {
			return tags.map((tag, index) => (
				<li key={index} className="px-3 mx-4 bg-gray-300 rounded-lg">
					{tag}
				</li>
			));
		}

		function renderSteps() {
			return steps.map((step, index) => {
				return <Checkbox key={index} step={step} />;
			});
		}

		function renderIngredients() {
			return ingredients.map((ingredient, index) => (
				<li key={index} className="text-lg">
					{ingredient}
				</li>
			));
		}

		return (
			<div className="w-full p-8 bg-white rounded">
				<Hero name={name} quote={quote} author={author} />
				<ul className="flex items-center justify-center my-4">
					{tags && renderTags()}
				</ul>
				<hr className="my-4" />
				<h2 className="my-2 text-2xl font-bold underline">Ingredients</h2>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{ingredients && renderIngredients()}
				</ul>
				<h2 className="my-2 text-2xl font-bold underline">Directions</h2>
				<div className="flex flex-col">{steps && renderSteps()}</div>
			</div>
		);
	}

	return (
		<section className="container max-w-5xl m-auto">
			{renderLoading()}
			{renderRecipe()}
		</section>
	);
}
