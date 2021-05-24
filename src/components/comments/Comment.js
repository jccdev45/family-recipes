import { Link } from "react-router-dom";

export function Comment({ comment }) {
  const { message, author, userId, createdAt } = comment;

  return (
    <div className="w-full px-6 py-2 mx-auto my-4 text-lg border border-red-200 rounded-lg lg:w-2/3 md:w-5/6 bg-gray-50">
      <p className="text-xl">"{message}"</p>
      <div className="w-full ml-auto text-right">
        <Link to={`/users/${userId}`} className="text-blue-500 hover:underline">
          - {author}
        </Link>
        <h3>{createdAt && createdAt.toDate().toLocaleDateString()}</h3>
      </div>
    </div>
  );
}
