export function FilterCheckbox({ value, checked, handleToggle }) {
  return (
    <span
      className={`${
        checked ? "bg-blue-100" : "bg-white"
      } transition-colors duration-200 ease-in-out flex justify-start w-full rounded-full`}
    >
      <span className="w-1/3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            handleToggle(e);
          }}
          className="w-full rounded cursor-pointer"
          value={value}
        />
      </span>
      <label htmlFor={value} className="w-2/3 font-bold">
        {value}
      </label>
    </span>
  );
}
