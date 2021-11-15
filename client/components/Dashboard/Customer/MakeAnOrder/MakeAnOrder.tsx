import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../store/store";
import { OrderStep } from "../../../../types/types";
import BurgerBuilder from "./BurgerBuilder";
import OrderForm from "./OrderForm";
import OrderTransition from "./OrderTransition";
import QuantityQuestion from "./QuantityQuestion";
import Submitted from "./Submitted";

interface Props {}

const MakeAnOrder = (props: Props) => {
	const Step = useSelector((state: RootState) => state.orderReducer.Step);
	return (
		<Container>
			<OrderTransition motionKey={Step}>
				{Step === OrderStep.QuantityQuestion && <QuantityQuestion />}
				{Step === OrderStep.BuildOrder && <BurgerBuilder />}
				{Step === OrderStep.OrderForm && <OrderForm />}
				{Step === OrderStep.Submitted && <Submitted />}
			</OrderTransition>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	overflow-y: auto;
`;

export default MakeAnOrder;
