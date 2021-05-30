import { Comment } from "./Comment";
import { useComment } from "../../util/hooks/useComment";
import { Loading } from "../shared";
import { AddComment } from "./AddComment";

export function Comments({ recipeId }) {
  const { comments, isLoading, error } = useComment(recipeId);

  const renderComments = () => {
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <div className="w-full p-4 mx-auto my-4 bg-gray-100 rounded-lg md:w-5/6">
      {error && <h1>{error}</h1>}
      <Loading isLoading={isLoading} />
      <h2 className="w-full mx-auto my-4 text-2xl font-bold text-center uppercase">
        Comments
      </h2>
      <AddComment recipeId={recipeId} />
      {comments && renderComments()}
    </div>
  );
}
