import { useState } from "react";

export function Checkbox({ step }) {
	const [checked, toggleChecked] = useState(false);

	return (
		<span className="flex items-center my-1 text-lg">
			<input
				type="checkbox"
				checked={checked}
				onChange={() => toggleChecked(!checked)}
				className="w-6 h-6 p-4 rounded checked:line-through"
				name={step}
			/>
			<label
				htmlFor={step}
				onClick={() => toggleChecked(!checked)}
				className={`${checked ? "line-through" : "no-underline"} mx-2`}
			>
				{step}
			</label>
		</span>
	);
}
