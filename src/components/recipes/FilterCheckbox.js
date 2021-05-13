export function FilterCheckbox({ value, checked, handleToggle }) {
	return (
		<span
			className={`${
				checked ? "bg-blue-200" : "bg-white"
			} transition-colors duration-200 ease-in-out flex items-center p-2 text-lg lg:my-1 w-32 mx-auto rounded-full`}
		>
			<span className="w-1/3">
				<input
					type="checkbox"
					checked={checked}
					onChange={(e) => {
						handleToggle(e);
					}}
					className="w-full p-4 rounded"
					value={value}
				/>
			</span>
			<label htmlFor={value} className="w-2/3 mx-2 font-bold">
				{value}
			</label>
		</span>
	);
}
