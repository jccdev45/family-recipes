import React, { useState, useRef } from "react";
import { FilterCheckbox, Recipe } from "../../components/recipes";
import { Hero, Loading } from "../../components/shared";
import { useRecipe } from "../../util/hooks/useRecipe";

export function Recipes() {
	const sortRef = useRef();
	const [sorting, setSorting] = useState([]);
	const { recipes, isLoading } = useRecipe();

	function renderRecipes() {
		return recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
	}

	function handleToggle(e) {
		const { value } = e.target;
		let arr = [...sorting];

		arr.includes(value)
			? setSorting((arr) => {
					return [...arr.splice(arr.indexOf(value), 1)];
			  })
			: setSorting((arr) => {
					return [...arr, value];
			  });
	}

	function convertToFields() {
		let arr = [];
		recipes.map((recipe) => arr.push(Object.values(recipe.tags)));
		let filtered = [...new Set(arr.flat())];

		return filtered.map((item) => (
			<FilterCheckbox
				key={item}
				value={item}
				checked={sorting.includes(item)}
				handleToggle={handleToggle}
			/>
		));
	}

	if (!recipes) return;
	return (
		<div className="flex flex-col">
			<Loading isLoading={isLoading} />

			<Hero name="Recipes" img="bg-hero-recipe" />
			<div
				ref={sortRef}
				className="flex flex-wrap w-5/6 mx-auto rounded-lg shadow"
			>
				{recipes.length && convertToFields()}
			</div>
			<div className="grid grid-cols-1 gap-4 px-6 md:gap-8 md:grid-cols-1 lg:grid-cols-2">
				{recipes && renderRecipes()}
			</div>
		</div>
	);
}
