import { useState } from "react";
import { FilterCheckbox, Recipe } from "../../components/recipes";
import { Hero, Loading } from "../../components/shared";
import { useRecipe } from "../../util/hooks/useRecipe";

export function Recipes() {
	const [open, toggleOpen] = useState(false);
	const [sorting, setSorting] = useState([]);
	const { recipes, isLoading, tagsForSort, filteredRecipes, error } = useRecipe(
		sorting
	);

	function renderRecipes() {
		return filteredRecipes.length
			? filteredRecipes.map((recipe) => (
					<Recipe key={recipe.id} recipe={recipe} />
			  ))
			: recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
	}

	function renderFields() {
		return (
			tagsForSort &&
			tagsForSort.map((item) => (
				<FilterCheckbox
					key={item}
					value={item}
					checked={sorting.includes(item)}
					handleToggle={handleToggle}
				/>
			))
		);
	}

	function handleToggle(e) {
		toggleOpen(false);

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

	function clearClose() {
		toggleOpen(false);
		setSorting([]);
	}

	if (!recipes) return;
	return (
		<div className="flex flex-col">
			{error && (
				<div className="text-lg font-bold text-red-400">
					{JSON.stringify(error)}
				</div>
			)}
			<Loading isLoading={isLoading} />

			<Hero name="Recipes" img="bg-hero-recipe" />
			<button
				onClick={() => toggleOpen(true)}
				className="block w-1/3 p-4 mx-auto my-2 text-white bg-blue-400 rounded-lg ring-2 ring-offset-white lg:hidden"
			>
				Open Filters
			</button>
			<div className="relative hidden w-full grid-cols-9 px-8 pb-20 mx-auto rounded-lg shadow lg:grid">
				{recipes.length && renderFields()}
				<button
					onClick={() => clearClose()}
					className="absolute bottom-0 w-1/6 p-3 mx-auto my-4 ml-24 text-white bg-blue-400 rounded-lg left-1/3 ring-2 ring-offset-white"
				>
					Clear Filters
				</button>
			</div>

			<div
				className={`${
					open ? "block" : "hidden"
				} w-screen h-screen bg-gray-500 z-30 grid place-items-center bg-opacity-50 fixed top-0 left-0`}
			>
				<div className="relative grid w-5/6 grid-cols-2 p-2 bg-white rounded-lg shadow md:grid-cols-3 place-items-center">
					<button
						className="absolute px-3 py-1 text-white bg-red-500 rounded-full hover:bg-red-600 -top-2 -right-2"
						onClick={() => toggleOpen(false)}
					>
						X
					</button>
					{recipes.length && renderFields()}
				</div>
				<button
					onClick={() => clearClose()}
					className="absolute w-1/3 p-4 mx-auto my-2 text-white bg-blue-400 rounded-lg bottom-14 md:bottom-32 left-1/3 ring-2 ring-offset-white"
				>
					Clear Filters
				</button>
			</div>
			<div
				className="grid grid-cols-1 gap-4 px-6 md:gap-8 md:grid-cols-1 lg:grid-cols-2"
				style={{ minHeight: `650px` }}
			>
				{recipes && renderRecipes()}
			</div>
		</div>
	);
}
