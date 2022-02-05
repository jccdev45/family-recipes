import { useState, useEffect } from "react";
import { FilterCheckbox, Recipe } from "../../components/recipes";
import { Hero, Loading } from "../../components/shared";
import Button from "../../components/shared/Button";
import { useNav } from "../../util/contexts";
import { useRecipe } from "../../util/hooks/useRecipe";
import { useToggle } from "../../util/hooks/useToggle";

export function Recipes() {
  const { isOpen, setIsOpen } = useNav();
  const [open, toggleOpen] = useToggle(false);
  const [sorting, setSorting] = useState([]);
  const { recipes, isLoading, tagsForSort, filteredRecipes, error } = useRecipe(
    sorting
  );

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderRecipes() {
    return filteredRecipes.length
      ? filteredRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))
      : recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />);
  }

  function renderFields() {
    return (
      tagsForSort &&
      tagsForSort.map((item) => (
        <FilterCheckbox
          key={item}
          value={item}
          checked={sorting.includes(item)}
          handleToggle={handleToggle}
        />
      ))
    );
  }

  function handleToggle(e) {
    if (open) toggleOpen(false);

    const { value } = e.target;
    let arr = [...sorting];

    return arr.includes(value)
      ? setSorting((arr) => {
          return [...arr.splice(arr.indexOf(value), 1)];
        })
      : setSorting((arr) => {
          return [...arr, value];
        });
  }

  function clearClose() {
    if (open) toggleOpen(false);
    setSorting([]);
  }

  if (!recipes) return <div></div>;
  return (
    <div className="flex flex-col">
      {error && (
        <div className="text-lg font-bold text-red-400">
          {JSON.stringify(error)}
        </div>
      )}
      <Loading isLoading={isLoading} />

      <Hero name="Recipes" page="recipes" />

      {/* OPEN MODAL */}
      <button
        onClick={() => toggleOpen(true)}
        className="block w-1/3 p-4 mx-auto my-2 text-white bg-blue-400 rounded-lg ring-2 ring-offset-white md:hidden"
      >
        Open Filters
      </button>

      {/* MODAL */}
      <div
        className={`${
          open ? "block" : "hidden"
        } w-screen h-screen bg-gray-500 z-30 grid place-items-center bg-opacity-50 fixed top-0 left-0`}
      >
        <div className="relative grid w-5/6 grid-cols-2 p-2 bg-white rounded-lg shadow gap-y-2 md:grid-cols-3 place-items-center">
          <button
            className="absolute px-3 py-1 text-white bg-red-500 rounded-full hover:bg-red-600 -top-2 -right-2"
            onClick={() => toggleOpen(false)}
          >
            X
          </button>
          {recipes.length && renderFields()}
        </div>
        <button
          onClick={() => clearClose()}
          className="absolute w-1/3 p-4 mx-auto my-2 text-white bg-red-400 border border-white rounded-lg bottom-16 md:bottom-32 left-1/3"
        >
          Clear Filters
        </button>
      </div>

      <div className="flex items-center justify-center md:items-start md:justify-start">
        {/* TAGS */}
        <div className="relative hidden w-1/6 gap-2 pt-2 mx-auto rounded-lg shadow md:h-screen md:pb-8 md:sticky md:overflow-y-scroll md:top-4 md:flex md:flex-wrap">
          {recipes.length && renderFields()}
          <Button
            text={"Clear"}
            action={() => clearClose()}
            styles="bg-red-400 text-white justify-center items-center font-bold cursor-pointer w-1/3 mx-auto h-14"
          />
        </div>
        <div className="container relative flex flex-wrap w-full gap-8 p-4 md:w-5/6">
          {recipes && renderRecipes()}
        </div>
      </div>
    </div>
  );
}
