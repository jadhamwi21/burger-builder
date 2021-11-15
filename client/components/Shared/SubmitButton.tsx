import React from "react";
import styled from "styled-components";

interface Props {
	onClick: (e: React.MouseEvent) => void;
	Submitting: boolean;
	content: "Sign up" | "Sign In";
	margin?: string;
}

const SubmitButton = ({ onClick, Submitting, content, margin }: Props) => {
	const ButtonContent = (() => {
		if (Submitting) {
			return content === "Sign In" ? "Signing In" : "Signing Up";
		} else {
			return content === "Sign In" ? "Sign In" : "Sign Up";
		}
	})();
	return (
		<Button
			type="submit"
			value={ButtonContent}
			onClick={onClick}
			style={{ margin: margin }}
		/>
	);
};

const Button = styled.input`
	border: none;
	outline: none;
	padding: 1em 2em;
	background-color: black;
	color: white;
	border-radius: 8px;
	cursor: pointer;
	@media (max-width: 768px) {
		-webkit-appearance: none;
		-webkit-border-fit: border !important;
	}
`;

export default SubmitButton;
