import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecipe } from "../../util/hooks/useRecipe";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightgray" : null,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 4,
  background: isDragging ? "pink" : "",

  ...draggableStyle,
});

export function RenderArrayInputs({
  // error,
  ing,
  ingConfirm,
  recipe,
  setRecipe,
  step,
  stepConfirm,
  tag,
  tagConfirm,
  violentlyItChanges,
  addToValue,
  removeValue,
}) {
  const { tagsForSort } = useRecipe();

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const steps = reorder(
      recipe.steps,
      result.source.index,
      result.destination.index
    );

    setRecipe((recipe) => {
      return {
        ...recipe,
        steps,
      };
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* INGREDIENTS */}
      <label htmlFor="ing" className="relative flex items-center w-full">
        <small className="small">Ingredient</small>
        <textarea
          className={`${
            ingConfirm ? "border-green-400" : "border-gray-300"
          } input sticky top-0 pr-12`}
          type="text"
          name="ing"
          rows={1}
          placeholder="Onion, chives, etc"
          value={ing}
          onChange={violentlyItChanges}
          onKeyUp={(e) => {
            if (e.key === "Enter") addToValue("ingredients");
          }}
        />
        <span className="btn-add-value">
          <input
            type="button"
            value="+"
            className="bg-transparent cursor-pointer"
            onClick={() => addToValue("ingredients")}
          />
        </span>
        <span
          className={`${ingConfirm ? "opacity-100" : "opacity-0"} checkmark`}
        >
          ✅
        </span>
      </label>
      <ul className="flex flex-wrap items-center justify-center w-full py-2 my-2 bg-gray-100 rounded-lg">
        {recipe.ingredients && recipe.ingredients.length ? (
          recipe.ingredients.map((ing, index) => (
            <span key={index} className="relative">
              <li className="list-badge">{ing}</li>
              <input
                type="button"
                value="X"
                className={`remove-badge -right-1 top-0`}
                onClick={() => removeValue("ingredients", ing)}
              />
            </span>
          ))
        ) : (
          <div className="w-full h-full p-2 text-center">Pantry</div>
        )}
      </ul>

      {/* STEPS */}
      <label htmlFor="step" className="relative flex items-center w-full">
        <small className="small">Step</small>
        <textarea
          className={`${
            stepConfirm ? "border-green-400" : "border-gray-300"
          } input sticky top-0 pr-12`}
          type="text"
          name="step"
          rows={2}
          placeholder="Boil water"
          value={step}
          onChange={(e) => violentlyItChanges(e)}
          onKeyUp={(e) => {
            if (e.key === "Enter") addToValue("steps");
          }}
        />
        {ingConfirm ? (
          <span
            className={`${stepConfirm ? "opacity-100" : "opacity-0"} checkmark`}
          >
            ✅
          </span>
        ) : (
          <span className="btn-add-value">
            <input
              type="button"
              value="+"
              className="bg-transparent cursor-pointer"
              onClick={() => addToValue("steps")}
            />
          </span>
        )}
      </label>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <>
            <h2 className="font-bold text-center text-red-400">
              Click and drag to reorder steps as needed
            </h2>
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="flex flex-col items-center justify-center w-full py-2 pr-8 my-2 transition-colors duration-200 ease-in-out bg-gray-100 divide-y-2 divide-gray-300 rounded-lg md:px-8"
            >
              {recipe.steps && recipe.steps.length ? (
                recipe.steps.map((step, index) => (
                  <Draggable
                    key={index}
                    draggableId={step + index}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <span
                        className="relative w-11/12 my-1 transition-colors duration-100 ease-in-out bg-gray-200 rounded-lg"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <li className={`list-item list-inside list-decimal`}>
                          {step.charAt(0).toUpperCase() + step.slice(1)}
                        </li>
                        <input
                          type="button"
                          value="X"
                          className={`remove-badge -right-8 top-1`}
                          onClick={() => removeValue("steps", step)}
                        />
                      </span>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="w-full h-full p-2 text-center">Stairs</div>
              )}
              {provided.placeholder}
            </ul>
          </>
        )}
      </Droppable>

      {/* TAGS */}
      <label htmlFor="tag" className="relative flex items-center w-full input">
        <small className="small -top-2">Tag</small>
        <select
          className="w-5/6 py-2 mr-auto border border-gray-100 rounded-lg shadow md:w-1/3 focus:outline-none"
          name="tag"
          onChange={(e) => violentlyItChanges(e)}
        >
          {tagsForSort.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <input
          className={`${
            tagConfirm ? "border-green-400" : "border-gray-300"
          } w-5/6 mr-auto md:w-1/3 p-2 shadow border-gray-100 border rounded-lg`}
          type="text"
          name="tag"
          placeholder="Add a new tag"
          value={tag}
          onChange={(e) => violentlyItChanges(e)}
          onKeyUp={(e) => {
            if (e.key === "Enter") addToValue("tags");
          }}
        />
        {!tagConfirm ? (
          <span className="btn-add-value">
            <input
              type="button"
              value="+"
              className="bg-transparent cursor-pointer"
              onClick={() => addToValue("tags")}
            />
          </span>
        ) : (
          <span className={`checkmark`}>✅</span>
        )}
      </label>
      <ul className="flex flex-wrap items-center justify-center w-full py-2 my-2 bg-gray-100 rounded-lg">
        {recipe.tags && recipe.tags.length ? (
          recipe.tags.map((tag, index) => (
            <span key={index} className="relative">
              <li className="list-badge">{tag}</li>
              <input
                type="button"
                value="X"
                className={`remove-badge -right-1 top-0`}
                onClick={() => removeValue("tags", tag)}
              />
            </span>
          ))
        ) : (
          <div className="w-full h-full p-2 text-center">You're it</div>
        )}
      </ul>
    </DragDropContext>
  );
}
