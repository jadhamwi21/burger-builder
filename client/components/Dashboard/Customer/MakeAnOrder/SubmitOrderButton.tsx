import React from "react";
import styled from "styled-components";

const SubmitOrderButton = () => {
	return <Button type="submit">Submit Order</Button>;
};

const Button = styled.button`
	border: none;
	outline: none;
	border-radius: 6px;
	padding: 0.5em 1em;
	background-color: white;
	color: black;
	font-size: 18px;
	cursor: pointer;
`;

export default SubmitOrderButton;
