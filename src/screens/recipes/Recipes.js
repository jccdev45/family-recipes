import React from "react";
import { Recipe } from "../../components/recipes";
import { useRecipe } from "../../util/hooks/useRecipe";

export function Recipes() {
	const { recipes } = useRecipe();

	function renderRecipes() {
		return recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
	}

	return <div className="grid grid-cols-4">{recipes && renderRecipes()}</div>;
}
