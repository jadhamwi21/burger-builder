import React from "react";
import styled from "styled-components";
import { IgnoreCaseComparision } from "../../helper/functions";

interface Props {
	isToggled: boolean;
	toggle: (value: boolean) => void;
	value: string;
	Setter: (value: string) => void;
	error?: string;
}

const GenderList = ({ isToggled, toggle, value, Setter, error }: Props) => {
	return (
		<SelectList visible={isToggled} shift={error !== undefined}>
			<ListItem
				onClick={() => {
					Setter("Male");
					toggle(false);
				}}
				selected={IgnoreCaseComparision(value, "Male")}
			>
				Male
			</ListItem>
			<ListItem
				onClick={() => {
					Setter("Female");
					toggle(false);
				}}
				selected={IgnoreCaseComparision(value, "Female")}
			>
				Female
			</ListItem>
		</SelectList>
	);
};

const SelectList = styled.div<{ visible: boolean; shift: boolean }>`
	position: absolute;
	top: ${(props) => (props.shift ? "88%" : "68%")};
	left: 0;
	width: 100%;
	height: fit-content;
	background-color: rgba(0, 0, 0, 0.8);
	border-bottom-left-radius: 6px;
	border-bottom-right-radius: 6px;
	padding: 0.5em 0px;
	visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const ListItem = styled.div<{ selected: boolean }>`
	height: fit-content;
	width: 100%;
	color: white;
	cursor: pointer;
	background-color: ${(props) => (props.selected ? "#3434ff" : "initial")};
	&:hover {
		background-color: #3434ff;
	}
`;

export default GenderList;
