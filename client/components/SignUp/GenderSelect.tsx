import React from "react";
import styled from "styled-components";
import useClickObserver from "../../hooks/useClickObserver";
import useToggle from "../../hooks/useToggle";
import GenderList from "./GenderList";

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent) => void;
	GenderSetter: (value: string) => void;
	error?: string;
}

const GenderSelect = ({ value, onChange, GenderSetter, error }: Props) => {
	const { toggle, isToggled } = useToggle();
	const Ref = useClickObserver(() => toggle(false));
	return (
		<Wrapper ref={Ref}>
			<Label>Gender</Label>
			<Field
				name="gender"
				placeholder="Select Your Gender"
				type="text"
				value={value}
				onFocus={() => toggle(true)}
				autoComplete="off"
				onChange={onChange}
			/>
			<ErrorElement>{error}</ErrorElement>
			<GenderList
				toggle={toggle}
				isToggled={isToggled}
				value={value}
				Setter={GenderSetter}
				error={error}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	height: fit-content;
	width: fit-content;
	margin: 1.25em 0px;
`;

const Label = styled.label`
	display: block;
	color: black;
	font-weight: 700;
	font-size: 18px;
	margin-bottom: 10px;
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

const ErrorElement = styled.div`
	color: red;
	font-size: 12px;
	height: 30px;
	white-space: nowrap;
	margin-top: 1px;
`;

export default GenderSelect;
