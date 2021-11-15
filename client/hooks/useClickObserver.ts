import { useEffect, useRef } from "react";

const useClickObserver = (cb: () => void) => {
	const WrapperRef = useRef<HTMLDivElement>(null);
	const handleClickOutside = (e: any) => {
		if (WrapperRef.current && !WrapperRef.current.contains(e.target)) {
			cb();
		}
	};
	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return WrapperRef;
};

export default useClickObserver;
