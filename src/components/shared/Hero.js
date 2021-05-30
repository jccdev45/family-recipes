import { Link } from "react-router-dom";

export function Hero({ name, quote, author, page }) {
  function parseImg() {
    switch (page) {
      case "home":
        return `h-36 bg-hero-family-sm bg-local bg-center bg-contain bg-repeat md:h-56 md:bg-hero-family-lg lg:h-72 lg:bg-repeat-round lg:bg-fixed`;
      case "about":
        return "h-36 bg-hero-thanksgiving-sm bg-contain bg-no-repeat md:bg-hero-thanksgiving-lg md:h-72 md:bg-repeat-round";
      case "recipes":
        return "h-80 bg-hero-recipe bg-cover bg-top bg-no-repeat md:bg-contain md:h-52 lg:h-72";
      case "add":
        return "h-80 bg-hero-form bg-cover bg-top bg-no-repeat md:bg-contain md:h-96";
      case "profile":
        return "h-72 bg-hero-user bg-cover bg-top bg-no-repeat lg:bg-contain md:h-96 lg:h-72";
      default:
        return;
    }
  }

  return (
    <div
      className={`${parseImg()} w-screen bg-fixed flex justify-between px-8 m-auto`}
    >
      <div className="w-2/3 p-8 m-auto font-bold text-center text-white bg-gray-800 rounded bg-opacity-70 lg:w-1/3">
        <h1 className="text-xl text-red-100 md:text-4xl">
          {page === "Edit" ? (
            <>
              <span className="font-normal text-white">Edit: </span> {name}
            </>
          ) : (
            name
          )}
        </h1>
        {author && (
          <Link to="/" className="text-xl">
            by: <span className="text-blue-300 hover:underline">{author}</span>
          </Link>
        )}
      </div>
      {quote ? (
        <h2 className="text-xl text-right">
          "{quote}"
          <Link to="" className="block text-blue-400 hover:underline">
            - {author}
          </Link>
        </h2>
      ) : (
        ""
      )}
    </div>
  );
}
