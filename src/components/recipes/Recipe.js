import { Link } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useComment } from "../../util/hooks/useComment";

export function Recipe({ recipe }) {
  const { recipeName, path, author, quote, tags, img, id, userId } = recipe;
  const { comments } = useComment(id);

  function renderTags() {
    return tags.sort().map((tag, index) => (
      <li key={index} className="px-1 text-gray-700 bg-gray-300 rounded-xl">
        {tag}
      </li>
    ));
  }

  if (!recipe) return <div></div>;
  return (
    <div className="w-full md:w-2/5 lg:w-2/5 mx-auto">
      <div className="relative flex h-full">
        <img
          alt="gallery"
          className="absolute inset-0 object-cover object-center w-full h-full md:rounded-tl-3xl hover:md:rounded-br-none hover:md:rounded-tl-none md:rounded-br-3xl"
          src={img}
        />
        <div className="relative flex flex-col w-full h-full gap-4 px-8 transition-opacity duration-200 ease-in-out border-4 opacity-95 border-gray-200 py-4 md:py-[20%] md:rounded-tl-3xl hover:md:rounded-tl-3xl hover:md:rounded-br-3xl md:rounded-br-3xl bg-white/80 hover:md:opacity-100 md:opacity-0">
          <span className="mr-auto">
            <Link
              to={`/recipes/${path}`}
              className="w-full pb-1 mb-1 text-lg font-medium tracking-widest text-left text-indigo-500 underline uppercase title-font decoration-indigo-600/70 decoration-dotted"
            >
              {recipeName}
            </Link>
          </span>
          <h2 className="max-w-full mb-3 font-medium text-right text-gray-900 truncate">
            "{quote}"
          </h2>
          <span className="ml-auto">
            <Link
              to={`/user/${userId}`}
              className="ml-auto tracking-wide text-right text-indigo-500 underline decoration-indigo-600/70 decoration-dotted"
            >{`- ${author}`}</Link>
          </span>
          <ul className="flex items-center justify-end w-full gap-1 overflow-x-scroll">
            {renderTags()}
          </ul>
        </div>
      </div>
    </div>
  );
}
