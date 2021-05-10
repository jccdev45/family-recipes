import { useEffect } from "react";
import { useStorage } from "../../util/hooks/useStorage";

export function ProgressBar({ file, memoizedSetFile }) {
	const { progress, url } = useStorage(file);

	useEffect(() => {
		if (url) memoizedSetFile(null);
	}, [url, memoizedSetFile]);

	return (
		<div
			style={{ width: progress + "%" }}
			className={`${progress === 100 ? "rounded-tr-none" : "rounded-tr-lg"}
      ${progress < 50 ? "bg-green-200" : "bg-green-600"}
      absolute left-0 h-4 transition-colors duration-200 ease-in-out border-gray-500 rounded-bl-lg rounded-br-lg opacity-50 bottom-2`}
		></div>
	);
}
