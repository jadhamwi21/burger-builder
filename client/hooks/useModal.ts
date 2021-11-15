import { useEffect, useState } from "react";

const useModal = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
		return () => {
			setMounted(false);
		};
	}, []);
	return mounted;
};

export default useModal;
