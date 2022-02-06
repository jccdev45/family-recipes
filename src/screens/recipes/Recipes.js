import { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  ClearRefinements,
  RefinementList,
  SortBy,
} from "react-instantsearch-dom";
import { FilterCheckbox, Recipe } from "../../components/recipes";
import { Hero, Loading } from "../../components/shared";
import Button from "../../components/shared/Button";
import { useNav } from "../../util/contexts";
import { useRecipe } from "../../util/hooks/useRecipe";
import { useToggle } from "../../util/hooks/useToggle";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

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

      <div className="flex flex-col w-full gap-4 px-2 md:flex-row md:gap-0 md:p-0">
        <InstantSearch searchClient={searchClient} indexName="recipes">
          <div className="flex flex-col w-full p-2 border-gray-500 md:w-1/4 lg:w-2/12 md:border-r">
            {/* <SortBy
              defaultRefinement="recipes"
              items={[{ value: "recipes", label: "All" }]}
            />
            <ClearRefinements
              translations={{
                reset: "Clear all",
              }}
            /> */}
            {/* <div className="w-5/6 h-0 mx-auto my-2 border border-gray-300" /> */}
            <RefinementList
              attribute="tags"
              showMore
              searchable
              translations={{
                showMore(expanded) {
                  return expanded ? "Show less" : "Show more";
                },
                noResults: "No results",
                submitTitle: "Submit your search query.",
                resetTitle: "Clear your search query.",
                placeholder: "Search tags...",
              }}
            />
          </div>

          <div className="w-5/6 h-0 mx-auto my-2 border border-gray-300 md:hidden" />

          <div className="w-full py-2 md:w-3/4 lg:w-5/6">
            {/* {recipes && renderRecipes()} */}
            <SearchBox
              className="w-full mx-auto md:w-2/3"
              translations={{
                submitTitle: "Submit your search query.",
                resetTitle: "Clear your search query.",
                placeholder: "Search recipes...",
              }}
            />
            <Hits hitComponent={Recipe} />
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}
