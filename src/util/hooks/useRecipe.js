import { useEffect, useReducer } from "react";
import { orderBy, query, onSnapshot } from "firebase/firestore";
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
        recipe: payload.recipe,
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

export function useRecipe(sorting = []) {
  const [state, dispatch] = useReducer(reducer, {
    recipes: [],
    recipe: {},
    tagsForSort: [],
    filteredRecipes: [],
    isLoading: true,
    error: "",
  });

  function convertToFields(array) {
    let arr = [];
    array.map((recipe) => arr.push(Object.values(recipe.tags)));
    let unique = [...new Set(arr.flat())];
    return unique.sort();
  }

  useEffect(() => {
    if (sorting.length < 1) {
      const q = query(database.recipes, orderBy("createdAt", "desc"));
      const getRecipeSnapshot = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) return;

        const results = [];

        querySnapshot.forEach((doc) => {
          if (doc.exists) results.push(database.formatDoc(doc));

          return results;
        });

        dispatch({
          type: ACTIONS.SET_RECIPES,
          payload: {
            recipes: results,
          },
        });
        dispatch({
          type: ACTIONS.SET_TAGS,
          payload: {
            tagsForSort: convertToFields(results),
          },
        });
      });
      return () => getRecipeSnapshot();
    }

    if (sorting.length >= 1) {
      const sortTag = new Set(sorting);
      const result = state.recipes.filter((recipe) => {
        return recipe.tags.some((tag) => sortTag.has(tag));
      });

      dispatch({
        type: ACTIONS.SET_FILTERED_RECIPES,
        payload: { filteredRecipes: result },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting.length]);

  return state;
}
