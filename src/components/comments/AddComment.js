import { useRef } from "react";
import { useAuth } from "../../util/contexts";
import { database } from "../../util/firebase/firebase";

export function AddComment({ recipeId }) {
  const { currentUser } = useAuth();
  const commentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      author: currentUser.displayName,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      message: commentRef.current.value,
      recipeId: recipeId,
      likes: 0,
      likedBy: [],
    };

    database.comments.add(commentToAdd);
    commentRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-end w-full mx-auto md:w-3/4 lg:w-2/3"
    >
      <label htmlFor="comment" className="w-full">
        <textarea
          name="comment"
          rows={4}
          placeholder="Love the recipe? Leave a comment!"
          ref={commentRef}
          className="w-full p-4 rounded-lg"
        />
      </label>
      <button className="px-4 py-3 my-2 ml-auto text-white transition-shadow duration-200 ease-in-out bg-blue-400 rounded-lg shadow hover:shadow-md">
        Submit
      </button>
    </form>
  );
}
