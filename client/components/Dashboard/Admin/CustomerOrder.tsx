import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { ActionTypes } from "../../../hooks/useAdmin";
import { SingleOrderType } from "../../../types/types";
import OrderStatus from "../Customer/MyOrders/OrderStatus";
import OrderView from "../Customer/MyOrders/OrderView";

interface Props {
	Order: SingleOrderType;
	dispatcher: React.Dispatch<{
		type: ActionTypes;
		payload?: any;
	}>;
}

const CustomerOrder = ({ Order, dispatcher }: Props) => {
	const [orderInView, setOrderInView] = useState<null | SingleOrderType>(null);
	return (
		<Container>
			<OrderDetailElement>Order Name : {Order.OrderName}</OrderDetailElement>
			<OrderDetailElement>
				Order Address : {Order.OrderAddress}
			</OrderDetailElement>
			<OrderDetailElement>
				Order Status : <OrderStatus status={Order.OrderStatus} />
			</OrderDetailElement>
			<Controllers>
				<ViewButton onClick={() => setOrderInView(Order)}>View</ViewButton>
				{Order.OrderStatus === "in cook" && (
					<ChangeOrderStatusButton
						onClick={() => {
							axios
								.put(
									"https://burger-builder2.herokuapp.com/order/deliver",
									{ orderId: Order.OrderId },
									{ withCredentials: true }
								)
								.then(() => {
									dispatcher({
										type: ActionTypes.Update,
										payload: {
											order: {
												...Order,
												OrderStatus: "delivered",
											},
										},
									});
								})
								.catch((e) => {
									console.log(e);
								});
						}}
					>
						Deliver
					</ChangeOrderStatusButton>
				)}
				{Order.OrderStatus === "pending" && (
					<ChangeOrderStatusButton
						onClick={() => {
							axios
								.put(
									"https://burger-builder2.herokuapp.com/order/in_cook",
									{ orderId: Order.OrderId },
									{ withCredentials: true }
								)
								.then(() => {
									dispatcher({
										type: ActionTypes.Update,
										payload: {
											order: {
												...Order,
												OrderStatus: "in cook",
											},
										},
									});
								})
								.catch((e) => {
									console.log(e);
								});
						}}
					>
						In Cook
					</ChangeOrderStatusButton>
				)}
			</Controllers>
			{orderInView !== null && (
				<OrderView order={orderInView} closeView={() => setOrderInView(null)} />
			)}
		</Container>
	);
};

const Container = styled.div`
	height: auto;
	min-height: 200px;
	width: 300px;
	background-color: rgb(184, 184, 184);
	color: black;
	border-radius: 6px;
	padding: 1em;
`;
const OrderDetailElement = styled.div`
	padding: 0.5em 0px;
`;

const Controllers = styled.div`
	margin: 1em auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	height: fit-content;
`;

const ViewButton = styled.button`
	border: none;
	outline: none;
	border-radius: 6px;
	padding: 0.5em 1em;
	font-weight: 600;
	color: #4245f3;
`;
const ChangeOrderStatusButton = styled.button`
	border: none;
	outline: none;
	border-radius: 6px;
	padding: 0.5em 1em;
	font-weight: 600;
	color: #000000;
`;

export default CustomerOrder;
