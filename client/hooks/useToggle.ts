import { useState } from "react";

const useToggle = () => {
	const [isToggled, setIsToggled] = useState(false);

	const toggle = (value: boolean) => setIsToggled(value);

	return {
		isToggled,
		toggle,
	};
};

export default useToggle;
