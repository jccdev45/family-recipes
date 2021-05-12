import { RenderArrayInputs } from "./RenderArrayInputs";
import { RenderNonArrayInputs } from "./RenderNonArrayInputs";

export function RecipeForm(props) {
	return (
		<div className="flex flex-col items-center w-full p-8 rounded md:w-5/6 lg:shadow-lg">
			<div className="w-full mx-auto lg:w-1/2">
				<RenderNonArrayInputs
					error={props.error}
					file={props.file}
					url={props.url}
					currentUser={props.currentUser}
					recipe={props.recipe}
					memoizedSetFile={props.memoizedSetFile}
					livingWithTheseChanges={props.livingWithTheseChanges}
					suddenlyItChanges={props.suddenlyItChanges}
				/>
				<RenderArrayInputs
					ing={props.ing}
					ingConfirm={props.ingConfirm}
					recipe={props.recipe}
					step={props.step}
					stepConfirm={props.stepConfirm}
					tag={props.tag}
					tagConfirm={props.tagConfirm}
					violentlyItChanges={props.violentlyItChanges}
					addToValue={props.addToValue}
					removeValue={props.removeValue}
				/>
			</div>
			<hr />
			<button
				className="p-4 my-2 text-white bg-blue-400 rounded"
				onClick={props.handleSubmit}
			>
				Submit
			</button>
		</div>
	);
}
