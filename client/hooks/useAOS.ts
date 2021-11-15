import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const useAOS = () => {
	useEffect(() => {
		AOS.init();
	}, []);
};

export default useAOS;
