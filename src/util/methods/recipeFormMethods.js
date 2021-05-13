export function addToValue(
	field,
	recipe,
	ingredients,
	ing,
	setIngConfirm,
	setIng,
	step,
	steps,
	setStepConfirm,
	setStep,
	tag,
	tags,
	setTagConfirm,
	setTag,
	setRecipe
) {
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
