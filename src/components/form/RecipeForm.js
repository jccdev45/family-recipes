import Button from "../shared/Button";
import { RenderArrayInputs } from "./RenderArrayInputs";
import { RenderNonArrayInputs } from "./RenderNonArrayInputs";

export function RecipeForm(props) {
  return (
    <div className="flex flex-col items-center w-full pl-2 pr-8 rounded md:p-8 md:w-5/6 lg:shadow-lg">
      <div className="w-full mx-auto lg:w-5/6">
        {props.error && (
          <div className="fixed top-0 left-0 z-30 w-screen h-screen pointer-events-none">
            <h2 className="w-1/3 p-10 mx-auto mt-20 text-center text-white bg-red-400 rounded-lg">
              {props.error}
            </h2>
          </div>
        )}
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
          error={props.error}
          ing={props.ing}
          ingConfirm={props.ingConfirm}
          recipe={props.recipe}
          setRecipe={props.setRecipe}
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
      <Button
        styles="p-4 my-2 text-white transition-shadow duration-300 ease-in-out bg-blue-400 rounded shadow hover:shadow-lg"
        action={props.handleSubmit}
        text="Submit"
      />
    </div>
  );
}
