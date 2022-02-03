import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { RiHeartAddFill } from "react-icons/ri";
import { database, firestore } from "../../util/firebase/firebase";
import { useAuth } from "../../util/contexts";

export function Comment({ comment }) {
  const { currentUser } = useAuth();
  const { message, author, userId, createdAt, likes, likedBy, id } = comment;

  const addLike = () => {
    if (likedBy.includes(currentUser.uid)) return;

    const commentRef = doc(firestore, "comments", id);
    setDoc(
      commentRef,
      { likes: likes + 1, likedBy: [...likedBy, currentUser.uid] },
      { merge: true }
    );

    // database.comments.doc(id).set(
    //   {
    //     likes: likes + 1,
    //     likedBy: [...likedBy, currentUser.uid],
    //   },
    //   { merge: true }
    // );
  };

  return (
    <div className="w-full px-6 py-2 mx-auto my-4 text-lg border border-red-200 rounded-lg md:w-3/4 lg:w-2/3 bg-gray-50">
      <p className="text-xl">"{message}"</p>
      <div className="w-full ml-auto text-right">
        <Link to={`/user/${userId}`} className="text-blue-500 hover:underline">
          - {author}
        </Link>
        <div className="flex items-end justify-between w-full">
          <span className="flex items-center">
            <RiHeartAddFill
              className="p-1 text-3xl text-red-500 transition-colors duration-300 ease-in-out rounded-full cursor-pointer md:text-4xl active:text-red-600 active:bg-red-200 active:scale-125"
              onClick={addLike}
            />
            <span className="mx-2 text-xl font-semibold text-red-800">
              {likes}
            </span>
          </span>
          <h3>{createdAt && createdAt.toDate().toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
}
