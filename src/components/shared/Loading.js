export function Loading({ isLoading }) {
  return (
    <div
      className={`${
        isLoading ? "block" : "hidden"
      } grid place-items-center z-50 fixed top-0 left-0 min-h-screen w-screen transition-all duration-150 ease-in-out`}
      style={{ backgroundColor: `rgba(0, 0, 0, 0.25)` }}
    >
      <div className="px-24 py-20 rounded bg-white/90">
        <h1 className="text-3xl">LOADING...</h1>
        <div className="w-32 h-32 mx-auto mt-12 border-4 border-blue-400 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
}
