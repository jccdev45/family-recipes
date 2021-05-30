import { useEffect, useReducer } from "react";
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
        error: payload.error,
      };
    default:
      return state;
  }
}

export function useComment(id) {
  const [state, dispatch] = useReducer(reducer, {
    comments: [],
    error: "",
    isLoading: true,
  });

  useEffect(() => {
    const snapIt = database.comments.orderBy("createdAt", "desc").onSnapshot(
      (snapshot) => {
        const comments = snapshot.docs
          .filter((comment) => comment.data().recipeId === id)
          .map(database.formatDoc);
        dispatch({
          type: ACTIONS.SET_COMMENTS,
          payload: { comments: comments },
        });
      },
      (error) => {
        dispatch({
          type: ACTIONS.ERROR,
          payload: { error },
        });
      }
    );
    return () => snapIt();
  }, [id]);

  return state;
}
