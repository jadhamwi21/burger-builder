import React from "react";
import styled from "styled-components";
import MenuTopping from "./MenuTopping";

const ToppingsMenu = () => {
	return (
		<Container>
			<Flexbox>
				<MenuTopping topping="Cheese" />
				<MenuTopping topping="Bacon" />
				<MenuTopping topping="Tomatto" />
				<MenuTopping topping="Egg" />
				<MenuTopping topping="Jalapeno" />
				<MenuTopping topping="Ketchup" />
				<MenuTopping topping="Lettuce" />
				<MenuTopping topping="Mushrooms" />
				<MenuTopping topping="Mustard" />
				<MenuTopping topping="Onions" />
			</Flexbox>
		</Container>
	);
};

const Container = styled.div`
	height: calc(100vh - 90px);
	width: fit-content;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #0e0e0e;
	overflow-y: auto;
	overflow-x: auto;
	user-select: none;
	::-webkit-scrollbar {
		width: 12px;
	}

	::-webkit-scrollbar-thumb {
		border: 2px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		border-radius: 9999px;
		background-color: white;
	}

	::-webkit-scrollbar-track {
		background: #0e0e0e;
		border: solid 1px #a8a7a7;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 14px 14px transparent;
		border: solid 4px transparent;
	}

	@media (max-width: 768px) {
		height: fit-content;
		width: 100vw;
		position: initial;
		display: block;
		margin-bottom: 4em;
		overflow-y: hidden;
	}
`;

const Flexbox = styled.div`
	padding: 1em;
	scroll-behavior: smooth;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: 768px) {
		flex-direction: row;
	}
`;
export default ToppingsMenu;
