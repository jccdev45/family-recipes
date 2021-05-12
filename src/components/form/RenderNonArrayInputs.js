import { ProgressBar } from "../../components/recipes/ProgressBar";
import { ImgWrapper } from "../../components/shared/ImgWrapper";
import {
	INPUT_BASE_CLASS,
	SMALL_CLASS,
	naInputs,
} from "../../data/constants/add_recipe_const";

export function RenderNonArrayInputs({
	error,
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
				className="relative grid grid-cols-1"
			>
				<small className={SMALL_CLASS}>{field.displayName}</small>
				{field.keyName === "img" ? (
					<>
						<input
							type="file"
							name="img"
							onChange={livingWithTheseChanges}
							className={INPUT_BASE_CLASS}
							defaultValue={file ? file : recipe.img}
						/>
						{error && (
							<div className="p-4 mx-auto my-2 text-center text-white bg-red-400 rounded-lg">
								{error}
							</div>
						)}
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
								className="mx-auto rounded-lg"
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
						className={`${INPUT_BASE_CLASS} border-gray-300`}
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
