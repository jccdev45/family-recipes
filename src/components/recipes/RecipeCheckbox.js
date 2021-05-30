import { useState } from "react";

export function RecipeCheckbox({ step }) {
  const [checked, toggleChecked] = useState(false);

  return (
    <span
      className={`${
        checked ? "bg-green-100" : "bg-white"
      } transition-colors duration-200 ease-in-out flex items-center py-2 text-lg lg:my-1`}
    >
      <span className="w-1/12">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleChecked(!checked)}
          className="w-full p-4 rounded checked:line-through"
          name={step}
        />
      </span>
      <label
        htmlFor={step}
        onClick={() => toggleChecked(!checked)}
        className={`${checked ? "line-through" : "no-underline"} w-11/12 mx-2`}
      >
        {step}
      </label>
    </span>
  );
}
