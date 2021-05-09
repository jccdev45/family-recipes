import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Checkbox } from "../../components/recipes";
import { Hero, Loading } from "../../components/shared";
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

	function renderRecipe() {
		if (!recipe) return;

		const { recipeName, author, steps, tags, quote, ingredients } = recipe;

		function renderTags() {
			return tags.map((tag, index) => (
				<li key={index} className="px-4 mx-4 text-lg bg-gray-300 rounded-xl">
					{tag}
				</li>
			));
		}

		function renderSteps() {
			return steps.map((step, index) => {
				return (
					<React.Fragment key={index}>
						<Checkbox step={step} />
						<hr />
					</React.Fragment>
				);
			});
		}

		function renderIngredients() {
			return ingredients.map((ingredient, index) => (
				<li key={index} className="text-lg list-disc list-inside list-item">
					{ingredient}
				</li>
			));
		}

		return (
			<div className="w-full rounded">
				<Hero
					img="bg-hero-cook"
					name={recipeName}
					quote={quote}
					author={author}
				/>
				<ul className="flex items-center justify-center my-4">
					{tags && renderTags()}
				</ul>
				<hr className="my-4" />
				<div className="container p-6 m-auto lg:p-8">
					<h2 className="my-2 text-2xl font-bold underline">Ingredients</h2>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{ingredients && renderIngredients()}
					</ul>
					<h2 className="my-2 text-2xl font-bold underline">Directions</h2>
					<div className="flex flex-col lg:w-7/12">{steps && renderSteps()}</div>
				</div>
			</div>
		);
	}

	return (
		<section className="">
			<Loading isLoading={isLoading} />
			{renderRecipe()}
		</section>
	);
}
