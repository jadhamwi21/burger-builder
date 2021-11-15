import React, { useState } from "react";

const useValidationToggle = () => {
	const [validation, setValidate] = useState(false);
	const toggleValidationOn = () => setValidate(true);
	return {
		Validation: validation,
		Toggler: toggleValidationOn,
	};
};

export default useValidationToggle;
