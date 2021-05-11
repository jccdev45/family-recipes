import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/recipes";
import { Loading } from "../../components/shared";
import { ImgWrapper } from "../../components/shared/ImgWrapper";
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

		const { recipeName, author, steps, tags, quote, img, ingredients } = recipe;

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
				<div className="grid w-11/12 grid-cols-1 px-2 py-2 mx-auto my-2 bg-red-100 rounded-lg lg:px-12 md:w-5/6 md:grid-cols-2">
					<div className="flex flex-col items-center order-2 w-full p-4 m-auto">
						<h1 className="text-2xl md:text-3xl lg:text-4xl">{recipeName}</h1>
						<h2 className="text-xl md:text-2xl">"{quote}"</h2>

						<span>by:</span>
						<Link to="/" className="text-xl">
							<span className="text-blue-300 hover:underline">{author}</span>
						</Link>
					</div>
					<ImgWrapper>
						<img
							src={img}
							alt={recipeName}
							className="absolute top-0 left-0 order-1 min-w-full min-h-full mx-auto rounded-lg"
						/>
					</ImgWrapper>
				</div>
				<ul className="flex items-center justify-center my-4">
					{tags && renderTags()}
				</ul>
				<hr className="my-4" />
				<div className="container p-6 m-auto lg:p-8">
					<h2 className="my-2 text-2xl font-bold underline">Ingredients</h2>
					<ol className="grid grid-cols-1 md:grid-cols-2">
						{ingredients && renderIngredients()}
					</ol>
					<h2 className="my-2 text-2xl font-bold underline">Directions</h2>
					<div className="flex flex-col lg:w-7/12">
						{steps && renderSteps()}
					</div>
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
