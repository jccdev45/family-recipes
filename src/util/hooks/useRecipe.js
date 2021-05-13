import { useEffect, useReducer } from "react";
import { database } from "../firebase/firebase";

const ACTIONS = {
	SET_RECIPES: "set-recipes",
	UPDATE_RECIPE: "update-recipe",
	SET_TAGS: "set-tags",
	SET_FILTERED_RECIPES: "set-filtered-recipes",
	ERROR: "error",
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.SET_RECIPES:
			return {
				...state,
				isLoading: false,
				recipes: payload.recipes,
				filteredRecipes: [],
			};
		case ACTIONS.UPDATE_RECIPE:
			return {
				...state,
				recipeId: payload.recipeId,
			};
		case ACTIONS.SET_TAGS:
			return {
				...state,
				isLoading: false,
				tagsForSort: payload.tagsForSort,
			};
		case ACTIONS.SET_FILTERED_RECIPES:
			return {
				...state,
				isLoading: false,
				filteredRecipes: payload.filteredRecipes,
			};
		case ACTIONS.ERROR:
			return {
				...state,
				isLoading: false,
				error: payload.error,
			};
		default:
			return state;
	}
}

export function useRecipe(sorting) {
	const [state, dispatch] = useReducer(reducer, {
		recipes: [],
		tagsForSort: [],
		filteredRecipes: [],
		isLoading: true,
		error: "",
	});

	function convertToFields() {
		if (state.tagsForSort.length) return;

		let arr = [];
		state.recipes.map((recipe) => arr.push(Object.values(recipe.tags)));
		let unique = [...new Set(arr.flat())];
		unique.sort();

		return dispatch({
			type: ACTIONS.SET_TAGS,
			payload: { tagsForSort: unique },
		});
	}

	useEffect(() => {
		if (sorting.length < 1) {
			return database.recipes.orderBy("createdAt").onSnapshot((snapshot) => {
				dispatch({
					type: ACTIONS.SET_RECIPES,
					payload: { recipes: snapshot.docs.map(database.formatDoc) },
				});
			});
		}
	}, [sorting]);

	useEffect(() => {
		if (state.recipes.length) return convertToFields();

		if (sorting.length) {
			return database.recipes
				.where("tags", "array-contains-any", sorting)
				.onSnapshot((snapshot) => {
					dispatch({
						type: ACTIONS.SET_FILTERED_RECIPES,
						payload: { filteredRecipes: snapshot.docs.map(database.formatDoc) },
					});
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sorting, state.recipes.length]);

	// function findRecipe(recipePath) {
	// 	if (state.recipes.length) {
	// 		const matchRecipe = state.recipes.find((rec) => {
	// 			const match = rec.path === recipePath;
	// 			return match;
	// 		});

	// 		dispatch({
	// 			type: ACTIONS.UPDATE_RECIPE,
	// 			payload: { recipe: matchRecipe, recipeId: matchRecipe.id },
	// 		});
	// 	}
	// }

	// function setRecipe() {
	// 	database.recipes
	// 		.doc(foundId)
	// 		.get()
	// 		.then((doc) => {
	// 			dispatch({
	// 				type: ACTIONS.UPDATE_RECIPE,
	// 				payload: { recipe: database.formatDoc(doc) },
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			dispatch({
	// 				type: ACTIONS.UPDATE_RECIPE,
	// 				payload: { recipe: ROOTCIPE },
	// 			});
	// 			dispatch({
	// 				type: ACTIONS.ERROR,
	// 				payload: { error },
	// 			});
	// 		});
	// }

	// useEffect(() => {
	// 	if (recipeId == null) {
	// 		return dispatch({
	// 			type: ACTIONS.UPDATE_RECIPE,
	// 			payload: recipe,
	// 		});
	// 	}

	// 	database.recipes
	// 		.doc(recipeId)
	// 		.get()
	// 		.then((doc) => {
	// 			dispatch({
	// 				type: ACTIONS.UPDATE_RECIPE,
	// 				payload: { recipe: database.formatDoc(doc) },
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			dispatch({
	// 				type: ACTIONS.ERROR,
	// 				payload: error,
	// 			});
	// 		});
	// }, [recipeId]);

	return state;
}
