import React, { useState } from "react";
import styled from "styled-components";
import useModal from "../../../../hooks/useModal";
import { SingleOrderType } from "../../../../types/types";
import CancelModal from "./CancelModal";
import OrderStatus from "./OrderStatus";

interface Props {
	Order: SingleOrderType;
	onView: (O: SingleOrderType) => void;
	onCancel: (O: SingleOrderType) => void;
}

const SingleOrder = ({ Order, onCancel, onView }: Props) => {
	const [modal, setModal] = useState(false);
	return (
		<Container>
			<OrderValueElement>{Order.OrderName}</OrderValueElement>
			<OrderValueElement>{Order.OrderAddress}</OrderValueElement>
			<OrderStatus status={Order.OrderStatus} />
			<ViewButton onClick={() => onView(Order)}>View</ViewButton>
			{Order.OrderStatus === "pending" && (
				<CancelElement
					onClick={() => {
						setModal(true);
					}}
				>
					Cancel
				</CancelElement>
			)}
			{modal && (
				<CancelModal
					cancel={() => onCancel(Order)}
					closeModal={() => setModal(false)}
				/>
			)}
		</Container>
	);
};

const Container = styled.div`
	height: fit-content;
	width: 70%;
	padding: 1em;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: #b9b9b9;
	border-radius: 6px;
	margin: 1.25em 0px;
	@media (max-width: 768px) {
		width: 90%;
	}
`;

const OrderValueElement = styled.div`
	color: black;
	width: 150px;
	text-align: left;
	height: fit-content;
	@media (max-width: 768px) {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const ViewButton = styled.button`
	background-color: #f7e96c;
	border: none;
	outline: none;
	border-radius: 4px;
	padding: 0.5em 1em;
`;

const CancelElement = styled.div`
	border: none;
	outline: none;
	color: black;
	text-decoration: underline;
	cursor: pointer;
`;

export default SingleOrder;
