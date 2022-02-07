import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth, useNav } from "../../util/contexts";
import { database } from "../../util/firebase/firebase";
import { useStorage } from "../../util/hooks/useStorage";
import { Hero } from "../../components/shared/Hero";
import { RecipeForm } from "../../components/form/RecipeForm";
import { types } from "../../data/constants/add_recipe_const";
import { addDoc } from "firebase/firestore";

export function AddRecipe() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { isOpen, setIsOpen } = useNav();

  const [ing, setIng] = useState("");
  const [ingConfirm, setIngConfirm] = useState(false);
  const [step, setStep] = useState("");
  const [stepConfirm, setStepConfirm] = useState(false);
  const [tag, setTag] = useState("");
  const [tagConfirm, setTagConfirm] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState({
    recipeName: "",
    quote: "",
    ingredients: [],
    steps: [],
    tags: [],
  });
  const { recipeName, ingredients, quote, steps, tags } = recipe;
  const { url } = useStorage(file);

  useEffect(() => {
    if (isOpen) setIsOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedSetFile = useCallback(() => {
    setFile();
  }, []);

  function addToValue(field) {
    const recipeCopy = { ...recipe };

    switch (field) {
      case "ingredients": {
        const arr = [...ingredients];
        if (!ing || arr.includes(ing)) return;
        arr.push(ing);
        setIngConfirm(true);
        recipeCopy[field] = arr;
        setIng("");
        setTimeout(() => {
          setIngConfirm(false);
        }, 1500);
        return setRecipe(recipeCopy);
      }
      case "steps": {
        const arr = [...steps];
        if (!step) return;
        if (arr.includes(step)) {
          setError("Step has already been entered");
          return setTimeout(() => {
            setError("");
          }, 3000);
        }
        arr.push(step);
        setStepConfirm(true);
        recipeCopy[field] = arr;
        setStep("");
        setTimeout(() => {
          setStepConfirm(false);
        }, 1500);
        return setRecipe(recipeCopy);
      }
      case "tags": {
        const arr = [...tags];
        if (!tag || arr.includes(tag)) return;
        arr.push(tag);
        setTagConfirm(true);
        recipeCopy[field] = arr;
        setTag("");
        setTimeout(() => {
          setTagConfirm(false);
        }, 1500);
        return setRecipe(recipeCopy);
      }
      default:
        return;
    }
  }

  function removeValue(field, elem) {
    const recipeCopy = { ...recipe };

    switch (field) {
      case "ingredients": {
        const arr = [...ingredients];
        const ind = arr.indexOf(elem);
        arr.splice(ind, 1);
        recipeCopy[field] = arr;
        return setRecipe(recipeCopy);
      }
      case "steps": {
        const arr = [...steps];
        const ind = arr.indexOf(elem);
        arr.splice(ind, 1);
        recipeCopy[field] = arr;
        return setRecipe(recipeCopy);
      }
      case "tags":
        const arr = [...tags];
        const ind = arr.indexOf(elem);
        arr.splice(ind, 1);
        recipeCopy[field] = arr;
        return setRecipe(recipeCopy);
      default:
        return;
    }
  }

  function suddenlyItChanges(e) {
    const { name, value } = e.target;
    const recipeCopy = { ...recipe };

    recipeCopy[name] = value;
    return setRecipe(recipeCopy);
  }

  function violentlyItChanges(e) {
    const { name, value } = e.target;

    switch (name) {
      case "ing":
        setIng(value);
        break;
      case "step":
        setStep(value);
        break;
      case "tag":
        setTag(value);
        break;
      default:
        break;
    }
  }

  function livingWithTheseChanges(e) {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid image type (png, jpg, jpeg)");
      return setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const recipeToAdd = {
      recipeName,
      ingredients,
      quote,
      steps,
      tags,
      img: url,
      author: currentUser.displayName,
      path: recipeName.slice().trim().replace(/ /g, "-"),
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      lastUpdated: database.getCurrentTimestamp(),
    };

    setError("");
    setIngConfirm(false);
    setStepConfirm(false);
    setTagConfirm(false);

    addDoc(database.recipes, recipeToAdd);
    history.push("/recipes");
  }

  if (!recipe) return;
  return (
    <section className="flex flex-col items-center w-full m-auto md:w-5/6 lg:w-2/3">
      <div className="overflow-hidden">
        <Hero page="add" name="Add a new recipe" />
      </div>
      <RecipeForm
        addToValue={addToValue}
        currentUser={currentUser}
        error={error}
        file={file}
        handleSubmit={handleSubmit}
        img=""
        ing={ing}
        ingConfirm={ingConfirm}
        livingWithTheseChanges={livingWithTheseChanges}
        memoizedSetFile={memoizedSetFile}
        recipe={recipe}
        setRecipe={setRecipe}
        removeValue={removeValue}
        step={step}
        stepConfirm={stepConfirm}
        suddenlyItChanges={suddenlyItChanges}
        tag={tag}
        tagConfirm={tagConfirm}
        url={url}
        violentlyItChanges={violentlyItChanges}
      />
    </section>
  );
}
