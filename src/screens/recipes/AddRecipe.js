import React, { useState, useCallback } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../util/contexts/AuthContext";
import { database } from "../../util/firebase/firebase";
import { ProgressBar } from "../../components/recipes/ProgressBar";
import { useStorage } from "../../util/hooks/useStorage";
import { Hero } from "../../components/shared/Hero";

const INPUT_BASE_CLASS = "w-full p-4 mx-auto my-2 border-2 rounded-lg";
const SMALL_CLASS =
	"absolute z-10 top-0 font-bold tracking-wider bg-white left-4";
const ADD_VALUE_BTN_CLASS =
	"absolute pb-1 px-1 text-3xl text-white transition-colors duration-100 ease-in-out bg-blue-300 rounded-full right-3 hover:bg-blue-400";
const LIST_BADGE_CLASS = "px-4 m-1 text-lg bg-gray-300 rounded-xl";
const REMOVE_BADGE_CLASS =
	"absolute top-0 px-1.5 bg-red-200 rounded-full -right-2 cursor-pointer hover:bg-red-300 transition-colors duration-100 ease-in-out";
const CHECKMARK_CLASS =
	"absolute text-2xl -right-6 transition-opacity duration-100 ease-in-out";

const naInputs = [
	{
		keyName: "recipeName",
		displayName: "Recipe Name",
		placeholder: "Lasagna, soup, etc",
	},
	{
		keyName: "quote",
		displayName: "Quote",
		placeholder: `"My specialty!"`,
	},
	{
		keyName: "img",
		displayName: "Picture",
		placeholder: "Image URL",
	},
];

const types = ["image/png", "image/jpg", "image/jpeg"];

export function AddRecipe() {
	const history = useHistory();
	const { currentUser } = useAuth();

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

	const memoizedSetFile = useCallback(() => {
		setFile();
	}, []);

	function renderNonArrayInputs() {
		return naInputs.map((field) => (
			<label
				htmlFor={field.keyName}
				key={field.keyName}
				className="relative flex items-center"
			>
				<small className={SMALL_CLASS}>{field.displayName}</small>
				{field.keyName === "img" ? (
					<div className="relative w-full">
						<input
							type="file"
							name="img"
							onChange={livingWithTheseChanges}
							className={INPUT_BASE_CLASS}
						/>
						{error && (
							<div className="p-4 mx-auto my-2 text-center text-white bg-red-400 rounded-lg">
								{error}
							</div>
						)}
						{file && (
							<ProgressBar file={file} memoizedSetFile={memoizedSetFile} />
						)}
						{url && <img src={url} className="mx-auto rounded-lg w-36" />}
					</div>
				) : (
					<input
						className={`${INPUT_BASE_CLASS} border-gray-300`}
						type="text"
						name={field.keyName}
						required={field.keyName === "recipeName"}
						placeholder={field.placeholder}
						value={recipe[field.keyName]}
						onChange={(e) => suddenlyItChanges(e)}
					/>
				)}
			</label>
		));
	}

	function addToValue(field) {
		const recipeCopy = { ...recipe };

		switch (field) {
			case "ingredients": {
				const arr = [...ingredients];
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
				const arr = [...steps];
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
				const arr = [...tags];
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
				const arr = [...ingredients];
				console.log(elem);
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
		};

		database.recipes.add(recipeToAdd);
		history.push("/recipes");
	}

	return (
		<section className="flex flex-col items-center w-full m-auto md:w-5/6 lg:w-2/3">
			<div className="overflow-hidden">
				<Hero img="bg-hero-form" name="Add a new recipe" />
			</div>
			<div className="flex flex-col items-center w-full p-8 rounded lg:shadow-lg">
				<div className="w-full mx-auto lg:w-1/2">
					{renderNonArrayInputs()}
					<label htmlFor="ing" className="relative flex items-center">
						<small className={SMALL_CLASS}>Ingredient</small>
						<input
							className={`${
								ingConfirm ? "border-green-400" : "border-gray-300"
							} ${INPUT_BASE_CLASS}`}
							type="text"
							name="ing"
							placeholder="Onion, chives, etc"
							value={ing}
							onChange={(e) => violentlyItChanges(e)}
							onKeyUp={(e) => {
								if (e.key === "Enter") addToValue("ingredients");
							}}
						/>
						<span className={ADD_VALUE_BTN_CLASS}>
							<input
								type="button"
								value="⨁"
								className="bg-transparent cursor-pointer"
								onClick={() => addToValue("ingredients")}
							/>
						</span>
						<span
							className={`${
								ingConfirm ? "opacity-100" : "opacity-0"
							} ${CHECKMARK_CLASS}`}
						>
							✅
						</span>
					</label>
					<ul className="flex flex-wrap items-center justify-center w-full py-2 my-2 bg-gray-100 rounded-lg">
						{ingredients.length ? (
							ingredients.map((ing, index) => (
								<span key={index} className="relative">
									<li className={LIST_BADGE_CLASS}>{ing}</li>
									<input
										type="button"
										value="X"
										className={REMOVE_BADGE_CLASS}
										onClick={() => removeValue("ingredients", ing)}
									/>
								</span>
							))
						) : (
							<div className="w-full h-full p-2 text-center">Pantry</div>
						)}
					</ul>
					<label htmlFor="step" className="relative flex items-center">
						<small className={SMALL_CLASS}>Step</small>
						<input
							className={`${
								stepConfirm ? "border-green-400" : "border-gray-300"
							} ${INPUT_BASE_CLASS}`}
							type="text"
							name="step"
							placeholder="Boil water"
							value={step}
							onChange={(e) => violentlyItChanges(e)}
							onKeyUp={(e) => {
								if (e.key === "Enter") addToValue("steps");
							}}
						/>
						<span className={ADD_VALUE_BTN_CLASS}>
							<input
								type="button"
								value="⨁"
								className="bg-transparent cursor-pointer"
								onClick={() => addToValue("steps")}
							/>
						</span>
						<span
							className={`${
								stepConfirm ? "opacity-100" : "opacity-0"
							} ${CHECKMARK_CLASS}`}
						>
							✅
						</span>
					</label>
					<ul className="flex flex-col items-center justify-center w-full py-2 my-2 bg-gray-100 rounded-lg">
						{steps.length ? (
							steps.map((step, index) => (
								<span key={index} className="relative">
									<li className={`${LIST_BADGE_CLASS} list-decimal`}>
										{step.charAt(0).toUpperCase() + step.slice(1)}
									</li>
									<input
										type="button"
										value="X"
										className={REMOVE_BADGE_CLASS}
										onClick={() => removeValue("steps", step)}
									/>
								</span>
							))
						) : (
							<div className="w-full h-full p-2 text-center">Stairs</div>
						)}
					</ul>
					<label htmlFor="tag" className="relative flex items-center">
						<small className={SMALL_CLASS}>Tag</small>
						<input
							className={`${
								tagConfirm ? "border-green-400" : "border-gray-300"
							} ${INPUT_BASE_CLASS}`}
							type="text"
							name="tag"
							placeholder="dinner, dessert"
							value={tag}
							onChange={(e) => violentlyItChanges(e)}
							onKeyUp={(e) => {
								if (e.key === "Enter") addToValue("tags");
							}}
						/>
						<span className={ADD_VALUE_BTN_CLASS}>
							<input
								type="button"
								value="⨁"
								className="bg-transparent cursor-pointer"
								onClick={() => addToValue("tags")}
							/>
						</span>
						<span
							className={`${
								tagConfirm ? "opacity-100" : "opacity-0"
							} ${CHECKMARK_CLASS}`}
						>
							✅
						</span>
					</label>
					<ul className="flex flex-wrap items-center justify-center w-full py-2 my-2 bg-gray-100 rounded-lg">
						{tags.length ? (
							tags.map((tag, index) => (
								<span key={index} className="relative">
									<li className={LIST_BADGE_CLASS}>{tag}</li>
									<input
										type="button"
										value="X"
										className={REMOVE_BADGE_CLASS}
										onClick={() => removeValue("tags", tag)}
									/>
								</span>
							))
						) : (
							<div className="w-full h-full p-2 text-center">You're it</div>
						)}
					</ul>
				</div>
				<hr />
				<button
					className="p-4 my-2 text-white bg-blue-400 rounded"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</div>
		</section>
	);
}
