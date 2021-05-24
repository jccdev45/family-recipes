import { Comment } from "./Comment";
import { useComment } from "../../util/hooks/useComment";
import { Loading } from "../shared";
import { AddComment } from "./AddComment";

// const mockComments = [
//   { id: 1, author: "me", message: "wow very cool" },
//   { id: 2, author: "you", message: "wow much cooler" },
// ];

export function Comments({ recipeId }) {
  const { comments, isLoading, error } = useComment(recipeId);

  return (
    <div className="w-full p-4 mx-auto bg-gray-100 rounded-lg md:w-5/6">
      {error && <h1>{error}</h1>}
      <Loading isLoading={isLoading} />
      <AddComment recipeId={recipeId} />
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
