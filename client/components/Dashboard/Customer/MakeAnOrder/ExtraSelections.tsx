import React from "react";
import styled from "styled-components";
import ExtrasCheckbox from "./ExtrasCheckbox";

const ExtraSelections = () => {
	return (
		<SelectionsWrapper>
			<ExtrasCheckbox label="Fries" />
			<ExtrasCheckbox label="Coke" />
		</SelectionsWrapper>
	);
};

const SelectionsWrapper = styled.div`
	height: fit-content;
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	@media (max-width: 768px) {
		margin: 2em auto;
	}
`;

export default ExtraSelections;
