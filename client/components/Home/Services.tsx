import React, { useEffect } from "react";
import styled from "styled-components";
import SingleService from "./SingleService";
import useAOS from "../../hooks/useAOS";

const Services = () => {
	useAOS();
	return (
		<ServicesContainer>
			<SingleService
				title="Thousand Of Clients"
				path="./user_icon.png"
				content="Many clients register, and start building their first burger, and order it instantly ."
				iconWidth="100px"
				iconHeight="100px"
				animationName="fade-in"
				animationDelay="0"
			/>
			<SingleService
				title="Low Prices"
				path="./dollar_icon.png"
				content="We’ve adjusted the prices so it suits everyone, and keep building high qualified burgers ."
				iconWidth="80px"
				iconHeight="80px"
				animationName="fade-in"
				animationDelay="400"
			/>
			<SingleService
				title="Alot Of Built Burgers"
				path="./burger_icon.png"
				content="We’ve built around 9023 burgers, with many variations, with a rich amount of toppings ."
				iconWidth="80px"
				iconHeight="80px"
				animationName="fade-in"
				animationDelay="800"
			/>
		</ServicesContainer>
	);
};

const ServicesContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: fit-content;
	padding: 6em;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export default Services;
