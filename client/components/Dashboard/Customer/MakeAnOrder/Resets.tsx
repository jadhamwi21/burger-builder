import React from "react";
import styled from "styled-components";
import ResetToppings from "./ResetToppings";
import StartOver from "./StartOver";

const Resets = () => {
	return (
		<Wrapper>
			<ResetToppings />
			<StartOver />
		</Wrapper>
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: fit-content;
	@media (max-width: 768px) {
		margin: 0 auto;
		flex-direction: column;
	}
`;

export default Resets;
