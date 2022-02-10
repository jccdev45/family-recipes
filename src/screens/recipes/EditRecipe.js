import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipeForm } from "../../components/form/RecipeForm";
import { Hero } from "../../components/shared/Hero";
import { useAuth, useNav } from "../../util/contexts";
import { database, firestore } from "../../util/firebase/firebase";
import { useStorage } from "../../util/hooks/useStorage";
import { types } from "../../data/constants/add_recipe_const";
import { doc, getDoc, setDoc } from "firebase/firestore";

export function EditRecipe() {
  const history = useHistory();
  const { isOpen, setIsOpen } = useNav();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [ing, setIng] = useState("");
  const [ingConfirm, setIngConfirm] = useState(false);
  const [step, setStep] = useState("");
  const [stepConfirm, setStepConfirm] = useState(false);
  const [tag, setTag] = useState("");
  const [tagConfirm, setTagConfirm] = useState(false);
  const [file, setFile] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState();
  const { url } = useStorage(file);

  useEffect(() => {
    if (isOpen) setIsOpen();

    const recipeRef = doc(firestore, "recipes", id);
    getDoc(recipeRef)
      .then((data) => {
        if (data.exists()) {
          setRecipe(data.data());
        } else {
          setRecipe({});
        }
      })
      .catch((error) => setError(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const memoizedSetFile = useCallback(() => {
    setFile();
  }, []);

  function addToValue(field) {
    const recipeCopy = { ...recipe };

    switch (field) {
      case "ingredients": {
        const arr = [...recipe.ingredients];
        if (!ing || arr.includes(ing)) return;
        setIngConfirm(true);
        arr.push(ing);
        recipeCopy[field] = arr;
        setIng("");
        setTimeout(() => {
          setIngConfirm(false);
        }, 2000);
        return setRecipe(recipeCopy);
      }
      case "steps": {
        const arr = [...recipe.steps];
        if (!step || arr.includes(step)) return;
        setStepConfirm(true);
        arr.push(step);
        recipeCopy[field] = arr;
        setStep("");
        setTimeout(() => {
          setStepConfirm(false);
        }, 2000);
        return setRecipe(recipeCopy);
      }
      case "tags": {
        const arr = [...recipe.tags];
        if (!tag || arr.includes(tag)) return;
        setTagConfirm(true);
        arr.push(tag);
        recipeCopy[field] = arr;
        setTag("");
        setTimeout(() => {
          setTagConfirm(false);
        }, 2000);
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
        const arr = [...recipe.ingredients];
        const ind = arr.indexOf(elem);
        arr.splice(ind, 1);
        recipeCopy[field] = arr;
        return setRecipe(recipeCopy);
      }
      case "steps": {
        const arr = [...recipe.steps];
        const ind = arr.indexOf(elem);
        arr.splice(ind, 1);
        recipeCopy[field] = arr;
        return setRecipe(recipeCopy);
      }
      case "tags":
        const arr = [...recipe.tags];
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
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIngConfirm(false);
    setStepConfirm(false);
    setTagConfirm(false);

    const dbRef = doc(firestore, "recipes", id);
    setDoc(
      dbRef,
      {
        recipeName: recipe.recipeName,
        path: recipe.recipeName.slice().trim().replace(/ /g, "-"),
        author: currentUser.displayName,
        ingredients: recipe.ingredients,
        quote: recipe.quote,
        steps: recipe.steps,
        tags: recipe.tags,
        img: url ? url : recipe.img,
        userId: currentUser.uid,
        lastUpdated: database.getCurrentTimestamp(),
      },
      { merge: true }
    );

    history.push(
      `/recipes/${recipe.recipeName.slice().trim().replace(/ /g, "-")}`
    );
  }

  if (!recipe) return;
  return (
    <section className="flex flex-col items-center w-full m-auto md:w-5/6 lg:w-2/3">
      <div className="overflow-hidden">
        <Hero img="bg-hero-form" name={recipe.recipeName} page="Edit" />
      </div>
      <RecipeForm
        addToValue={addToValue}
        currentUser={currentUser}
        error={error}
        file={file}
        handleSubmit={handleSubmit}
        ing={ing}
        ingConfirm={ingConfirm}
        livingWithTheseChanges={livingWithTheseChanges}
        memoizedSetFile={memoizedSetFile}
        recipe={recipe}
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
