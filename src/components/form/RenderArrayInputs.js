import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
        <input
          className={`${
            ingConfirm ? "border-green-400" : "border-gray-300"
          } input`}
          type="text"
          name="ing"
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
          className={`${ingConfirm ? "opacity-100" : "opacity-0"} "checkmark"`}
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
        <input
          className={`${
            stepConfirm ? "border-green-400" : "border-gray-300"
          } input`}
          type="text"
          name="step"
          placeholder="Boil water"
          value={step}
          onChange={(e) => violentlyItChanges(e)}
          onKeyUp={(e) => {
            if (e.key === "Enter") addToValue("steps");
          }}
        />
        <span className="btn-add-value">
          <input
            type="button"
            value="+"
            className="bg-transparent cursor-pointer"
            onClick={() => addToValue("steps")}
          />
        </span>
        <span
          className={`${stepConfirm ? "opacity-100" : "opacity-0"} "checkmark"`}
        >
          ✅
        </span>
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
              className="flex flex-col items-center justify-center w-full px-8 py-2 my-2 transition-colors duration-200 ease-in-out bg-gray-100 divide-y-2 divide-gray-300 rounded-lg"
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
      <label htmlFor="tag" className="relative flex items-center w-full">
        <small className="small">Tag</small>
        <input
          className={`${
            tagConfirm ? "border-green-400" : "border-gray-300"
          } input`}
          type="text"
          name="tag"
          placeholder="dinner, dessert"
          value={tag}
          onChange={(e) => violentlyItChanges(e)}
          onKeyUp={(e) => {
            if (e.key === "Enter") addToValue("tags");
          }}
        />
        <span className="btn-add-value">
          <input
            type="button"
            value="+"
            className="bg-transparent cursor-pointer"
            onClick={() => addToValue("tags")}
          />
        </span>
        <span
          className={`${tagConfirm ? "opacity-100" : "opacity-0"} "checkmark"`}
        >
          ✅
        </span>
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
