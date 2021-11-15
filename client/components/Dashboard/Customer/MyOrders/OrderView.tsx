import React, { useEffect } from "react";
import styled from "styled-components";
import useModal from "../../../../hooks/useModal";
import ReactDOM from "react-dom";
import { SingleOrderType } from "../../../../types/types";
import OrderStatus from "./OrderStatus";
import { BooleanToYesOrNo } from "../../../../helper/functions";

interface Props {
	closeView: () => void;
	order: SingleOrderType;
}

const OrderView = ({ closeView, order }: Props) => {
	const mountModal = useModal();
	return mountModal
		? ReactDOM.createPortal(
				<Container onClick={closeView}>
					<Modal onClick={(e) => e.stopPropagation()}>
						<KeyValueElement>Order Name : {order.OrderName}</KeyValueElement>
						<KeyValueElement>
							Order Address : {order.OrderAddress}
						</KeyValueElement>
						<KeyValueElement>
							Order Status : <OrderStatus status={order.OrderStatus} />
						</KeyValueElement>
						{order.Burgers.map((burger, index) => {
							return (
								<React.Fragment key={index}>
									<KeyValueElement>Burger Number {index + 1}:</KeyValueElement>
									<Burger>
										{burger.BurgerToppings.map((topping) => (
											<ToppingAndExtrasElement key={topping}>
												{topping}
											</ToppingAndExtrasElement>
										))}
										{burger.withFries && (
											<ToppingAndExtrasElement>Fries</ToppingAndExtrasElement>
										)}
										{burger.withCoke && (
											<ToppingAndExtrasElement>Coke</ToppingAndExtrasElement>
										)}
									</Burger>
								</React.Fragment>
							);
						})}
					</Modal>
				</Container>,
				document.getElementById("portal")!
		  )
		: null;
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: grid;
	place-items: center;
	background-color: rgba(0, 0, 0, 0.3);
`;

const Modal = styled.div`
	width: 50%;
	height: 50%;
	background-color: white;
	overflow-y: scroll;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	padding: 2em;
	::-webkit-scrollbar {
		width: 0px;
	}
`;
const KeyValueElement = styled.div`
	font-size: 18px;
	color: black;
	margin: 1em 0px;
`;

const Burger = styled.ul`
	padding: 0px;
	list-style: none;
	width: fit-content;
	height: fit-content;
	margin: 1em auto;
`;

const ToppingAndExtrasElement = styled.li`
	padding: 1em 0px;
`;

export default OrderView;
