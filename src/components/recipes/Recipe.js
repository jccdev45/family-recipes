import { Link } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useComment } from "../../util/hooks/useComment";

export function Recipe({ recipe }) {
  const { recipeName, path, author, quote, tags, img, id, userId } = recipe;
  const { comments } = useComment(id);

  function renderTags() {
    return tags.sort().map((tag, index) => (
      <li
        key={index}
        className="px-2 m-1 text-lg text-black bg-gray-300 lg:px-4 rounded-xl"
      >
        {tag}
      </li>
    ));
  }

  if (!recipe) return <div></div>;
  return (
    <article
      className="grid w-full grid-rows-1 mx-auto my-4 overflow-hidden transition-colors duration-200 ease-in-out bg-center bg-no-repeat bg-cover rounded-lg shadow-lg recipe-card place-items-end lg:grid-cols-1 md:w-3/4 lg:w-5/6 h-96"
      style={{
        backgroundImage: `url('${img}')`,
      }}
    >
      <div className="flex flex-col w-full p-2 mt-auto text-center transition-all duration-500 ease-in-out transform bg-gray-800 recipe-info h-2/5 lg:h-5/12 bg-opacity-90 lg:w-full justify-evenly">
        <span className="w-full">
          <Link
            to={`/recipes/${path}`}
            className="w-1/3 m-auto text-lg text-center text-blue-400 md:w-2/3 lg:text-2xl hover:underline"
          >
            {recipeName}
          </Link>
        </span>
        <div className="flex flex-col text-white">
          <div className="flex flex-col flex-wrap items-center justify-center ">
            <span className="w-full font-serif lg:w-2/3">"{quote}"</span>
            <span className="w-full lg:w-1/3">
              <span>-</span>
              <Link
                className="ml-1 text-right text-blue-400 lg:text-lg hover:underline"
                to={`/user/${userId}`}
              >
                {author}
              </Link>
            </span>
          </div>
          <div className="flex items-center px-4 justify-evenly">
            <div className="flex items-center w-1/6">
              <BsFillChatDotsFill className="mx-2 text-xl" /> {comments.length}
            </div>
            <ul className="flex flex-wrap items-center justify-end w-5/6">
              {renderTags()}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
