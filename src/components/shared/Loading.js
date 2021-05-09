export function Loading({ isLoading }) {
	return (
		<div
			className={`${
				isLoading ? "block" : "hidden"
			} grid place-items-center fixed top-0 left-0 min-h-screen w-screen transition-all duration-150 ease-in-out`}
			style={{ backgroundColor: `rgba(0, 0, 0, 0.25)` }}
		>
			<h1 className="p-24 text-3xl text-black bg-white rounded">LOADING...</h1>
		</div>
	);
}
