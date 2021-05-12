import {
	ADD_VALUE_BTN_CLASS,
	CHECKMARK_CLASS,
	INPUT_BASE_CLASS,
	LIST_BADGE_CLASS,
	REMOVE_BADGE_CLASS,
	SMALL_CLASS,
} from "../../data/constants/add_recipe_const";

export function RenderArrayInputs({
	ing,
	ingConfirm,
  recipe,
	step,
	stepConfirm,
	tag,
	tagConfirm,
	violentlyItChanges,
	addToValue,
  removeValue
}) {
	return (
		<>
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
					onChange={violentlyItChanges}
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
				{recipe.ingredients && recipe.ingredients.length ? (
					recipe.ingredients.map((ing, index) => (
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
				{recipe.steps && recipe.steps.length ? (
					recipe.steps.map((step, index) => (
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
				{recipe.tags && recipe.tags.length ? (
					recipe.tags.map((tag, index) => (
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
		</>
	);
}
