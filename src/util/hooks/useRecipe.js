import { useEffect, useReducer } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase/firebase";

const ACTIONS = {
	SET_RECIPES: "set-recipes",
	UPDATE_RECIPE: "update-recipe",
	ERROR: "error",
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.SET_RECIPES:
			return {
				...state,
        isLoading: false,
				recipes: payload.recipes,
			};
		case ACTIONS.UPDATE_RECIPE:
			return {
				...state,
				recipeId: payload.recipeId,
			};
		case ACTIONS.ERROR:
			return {
				...state,
				error: payload.error,
			};
		default:
			return state;
	}
}

export function useRecipe() {
	const [state, dispatch] = useReducer(reducer, {
		recipes: [],
    isLoading: true,
		error: "",
	});
	// const { currentUser } = useAuth();

	useEffect(() => {
		return database.recipes.onSnapshot((snapshot) => {
			dispatch({
				type: ACTIONS.SET_RECIPES,
				payload: { recipes: snapshot.docs.map(database.formatDoc) },
			});
		});
	}, []);

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
