import { useEffect, useReducer } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { database } from "../firebase/firebase";

const ACTIONS = {
  SET_COMMENTS: "set-comments",
  UPDATE_COMMENT: "update-comment",
  ERROR: "error",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SET_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments: payload.comments,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return {
        ...state,
        isLoading: false,
      };
  }
}

export function useComment(id) {
  const [state, dispatch] = useReducer(reducer, {
    comments: [],
    error: "",
    isLoading: true,
  });

  useEffect(() => {
    if (!id) return;

    const q = query(database.comments, where("recipeId", "==", id));
    const getCommentSnapshot = onSnapshot(q, (querySnapshot) => {
      // if (querySnapshot.empty) return;

      const results = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists) results.push(database.formatDoc(doc));

        return results;
      });
      dispatch({
        type: ACTIONS.SET_COMMENTS,
        payload: { comments: results },
      });
    });

    return () => getCommentSnapshot();
  }, [id]);

  return state;
}
