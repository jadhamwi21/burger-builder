import React from "react";
import styled from "styled-components";
import { FilterEnum } from "../../../hooks/useAdmin";

interface Props {
	FiltersHandler: (Filter: FilterEnum) => () => void;
}

const Filters = ({ FiltersHandler }: Props) => {
	return (
		<Container>
			<Filter onClick={FiltersHandler(FilterEnum.ClearAll)}>Clear All</Filter>
			<Filter onClick={FiltersHandler(FilterEnum.ClearCancelled)}>
				Clear Cancelled
			</Filter>
			<Filter onClick={FiltersHandler(FilterEnum.ClearDelivered)}>
				Clear Delivered
			</Filter>
			<Filter onClick={FiltersHandler(FilterEnum.ClearPending)}>
				Clear Pending
			</Filter>
			<Filter onClick={FiltersHandler(FilterEnum.ClearInCook)}>
				Clear In Cook
			</Filter>
		</Container>
	);
};
const Container = styled.ul`
	list-style: none;
	padding: 0px;
	color: white;
	position: fixed;
	top: 80%;
	left: 2%;
	& > * {
		padding: 0px;
	}
	@media (max-width: 768px) {
		top: 19%;
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background-color: #0e0e0e;
		padding: 1em;
	}
`;

const Filter = styled.li`
	cursor: pointer;
	transition: all 0.1s ease;
	&:hover {
		color: #3434ff;
	}
`;

export default Filters;
