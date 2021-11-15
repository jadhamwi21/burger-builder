import React from "react";
import styled from "styled-components";

interface Props {
	name?: string;
	value?: any;
	label?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	hidden?: boolean;
	error?: string;
	labelColor?: "white" | "black";
}

const InputComponent = ({
	name,
	value,
	label,
	onChange,
	hidden,
	error,
	labelColor,
}: Props) => {
	return (
		<Wrapper>
			<Label htmlFor={name} style={{ color: labelColor }}>
				{label}
			</Label>
			<Field
				name={name}
				value={value}
				id={name}
				onChange={onChange}
				type={hidden ? "password" : "text"}
				// autoComplete="off"
			/>
			<ErrorElement>{error}</ErrorElement>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	margin: 1.25em 0px;
`;

const Label = styled.label`
	display: block;
	color: black;
	font-weight: 700;
	font-size: 18px;
	margin-bottom: 10px;
`;

const ErrorElement = styled.div`
	color: red;
	white-space: nowrap;
	width: fit-content;
	font-size: 13px;
	height: 30px;
	position: absolute;
	top: 105%;
	left: 0%;
`;

const Field = styled.input`
	border: none;
	outline: none;
	background-color: #edeff2;
	color: black;
	padding: 0.6em 0.25em;
	border-radius: 8px;
	width: 250px;
	@media (max-width: 768px) {
		padding: 1em 0.5em;
		font-size: 1em;
	}
`;

export default InputComponent;
