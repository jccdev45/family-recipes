import React from "react";
import { Recipe } from "../../components/recipes";
import { Hero, Loading } from "../../components/shared";
import { useRecipe } from "../../util/hooks/useRecipe";

export function Recipes() {
	const { recipes, isLoading } = useRecipe();

	function renderRecipes() {
		return recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
	}

	return (
		<div className="flex flex-col">
			<Loading isLoading={isLoading} />

			<Hero name="Recipes" img="bg-hero-recipe" />
			<div className="grid grid-cols-1 gap-4 px-6 mx-auto lg:gap-8 lg:p-4 md:grid-cols-2 lg:grid-cols-3">
				{recipes && renderRecipes()}
			</div>
		</div>
	);
}
