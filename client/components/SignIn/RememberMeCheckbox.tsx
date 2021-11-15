import React, { useState } from "react";
import styled from "styled-components";

interface Props {
	checked: boolean;
	handleChange: any;
}

const RememberMeCheckbox = ({ checked, handleChange }: Props) => {
	return (
		<Wrapper>
			<CheckBox onChange={handleChange} type="checkbox" checked={checked} />
			<RememberMeText>Remember Me</RememberMeText>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	margin-top: 10px;
`;

const CheckBox = styled.input`
	height: 17px;
	width: 17px;
	border: solid 1px black;
	border-radius: 3.5px;
	padding: 0px;
	display: grid;
	place-items: center;
	margin-right: 20px;
`;

const RememberMeText = styled.span`
	padding-left: 1em;
	@media (max-width: 768px) {
		padding-left: 1.5em;
	}
`;

export default RememberMeCheckbox;
