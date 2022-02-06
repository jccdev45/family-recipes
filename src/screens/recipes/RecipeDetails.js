import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/comments";
import { RecipeCheckbox } from "../../components/recipes";
import { Loading } from "../../components/shared";
import Button from "../../components/shared/Button";
import { useAuth, useNav } from "../../util/contexts";
import { useRecipe } from "../../util/hooks/useRecipe";

export function RecipeDetails() {
  const { currentUser } = useAuth();
  const { isOpen, setIsOpen } = useNav();
  const { recipePath } = useParams();
  const { recipes, isLoading } = useRecipe();
  const [recipe, setRecipe] = useState({});

  const {
    author,
    id,
    img,
    ingredients,
    quote,
    recipeName,
    steps,
    tags,
    userId,
  } = recipe;

  useEffect(() => {
    if (isOpen) setIsOpen();
    if (!recipes) return;
    function getRecipeDetails() {
      recipes.find((rec) => {
        return rec.slug === recipePath ? setRecipe(rec) : null;
      });
    }

    getRecipeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipePath, recipes]);

  function renderRecipe() {
    if (!recipe) return;

    function renderEdit() {
      if (
        currentUser.uid === "P4BizdE36AMQcSfHW7STFIIsUWv1" ||
        currentUser.uid === userId
      ) {
        return (
          <Link
            to={`/edit-recipe/${recipe.id}`}
            className="mx-auto my-2 text-white bg-blue-400 btn hover:bg-blue-500"
          >
            Edit Recipe
            {/* <Button text="Edit Recipe" /> */}
          </Link>
        );
      }
    }

    function renderTags() {
      return tags.map((tag, index) => (
        <li key={index} className="px-4 mx-4 text-lg bg-gray-300 rounded-xl">
          {tag}
        </li>
      ));
    }

    function renderSteps() {
      return steps.map((step, index) => {
        return (
          <React.Fragment key={index}>
            <RecipeCheckbox step={step} />
            <hr />
          </React.Fragment>
        );
      });
    }

    function renderIngredients() {
      return ingredients.map((ingredient, index) => (
        <li key={index} className="text-lg list-disc list-inside list-item">
          {ingredient}
        </li>
      ));
    }

    return (
      <div className="flex flex-col justify-center w-full rounded">
        {/* INFO */}
        <div className="grid w-11/12 grid-cols-1 px-2 py-2 mx-auto my-2 bg-red-100 rounded-lg bg-opacity-30 lg:px-12 md:w-5/6 lg:w-2/3 md:grid-cols-2">
          <div className="flex flex-col items-center order-2 w-full p-4 m-auto">
            <h1 className="w-full my-4 text-2xl font-semibold text-center md:text-3xl lg:text-4xl">
              {recipeName}
            </h1>
            <h2 className="w-full text-xl text-center md:text-2xl">
              "{quote}"
            </h2>

            <Link to={`/user/${userId}`} className="w-full text-xl text-center">
              <span>by:</span>
              <span className="mx-1 text-blue-300 hover:underline">
                {author}
              </span>
            </Link>
            {renderEdit()}
          </div>
          <img
            src={img}
            alt={recipeName}
            className="w-full rounded-lg lg:w-2/3"
          />
        </div>
        <ul className="flex items-center justify-center my-4">
          {tags && renderTags()}
        </ul>
        <hr className="my-4" />

        {/* ING & STEPS */}
        <div className="container p-6 m-auto lg:p-8">
          <h2 className="my-2 text-2xl font-bold underline">Ingredients</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2">
            {ingredients && renderIngredients()}
          </ol>
          <h2 className="my-2 text-2xl font-bold underline">Directions</h2>
          <div className="flex flex-col lg:w-7/12">
            {steps && renderSteps()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <Loading isLoading={isLoading} />
      {renderRecipe()}
      <div className="w-11/12 mx-auto my-4 border-t-4 border-gray-300"></div>
      <Comments recipeId={id} />
    </section>
  );
}
