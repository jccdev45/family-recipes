import { ProgressBar } from "../../components/recipes/ProgressBar";
import { naInputs } from "../../data/constants/add_recipe_const";

export function RenderNonArrayInputs({
  // error,
  file,
  url,
  recipe,
  memoizedSetFile,
  livingWithTheseChanges,
  suddenlyItChanges,
}) {
  return (
    recipe &&
    naInputs.map((field) => (
      <label
        htmlFor={field.keyName}
        key={field.keyName}
        className="relative grid w-full grid-cols-1"
      >
        <small className="small">{field.displayName}</small>
        {field.keyName === "img" ? (
          <>
            <input
              type="file"
              name="img"
              onChange={livingWithTheseChanges}
              className="input"
              defaultValue={file ? file : recipe.img}
            />
            {file && (
              <ProgressBar file={file} memoizedSetFile={memoizedSetFile} />
            )}
            {url ? (
              <img
                src={url}
                alt={
                  recipe
                    ? recipe.recipeName
                    : "Some sort of delicious food, probably"
                }
                className="mx-auto bg-gray-300 rounded-lg"
              />
            ) : (
              <img
                src={recipe.img}
                alt={
                  recipe
                    ? recipe.recipeName
                    : "Some sort of delicious food, probably"
                }
                className="mx-auto rounded-lg"
              />
            )}
          </>
        ) : (
          <input
            className={`$"input" border-gray-300`}
            type="text"
            name={field.keyName}
            required={field.keyName === "recipeName"}
            placeholder={field.placeholder}
            value={recipe[field.keyName] || ""}
            onChange={suddenlyItChanges}
          />
        )}
      </label>
    ))
  );
}
