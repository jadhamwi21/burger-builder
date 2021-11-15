import React from "react";
import styled from "styled-components";
import useMyOrders from "../../../../hooks/useMyOrders";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "./Loading";
import SingleOrder from "./SingleOrder";
import OrderView from "./OrderView";

const variants = {
	start: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	finish: {
		opacity: 0,
	},
};

const MyOrders = () => {
	const { state, onView, onCancel, closeView } = useMyOrders();
	return (
		<React.Fragment>
			<AnimatePresence exitBeforeEnter={true} initial={false}>
				<motion.div
					variants={variants}
					initial="start"
					animate="animate"
					exit="finish"
					style={{ height: "fit-content", width: "100%" }}
					key={state.Loading === true ? 1 : 0}
				>
					<Container>
						{state.Loading && <Loading />}
						{state.Orders.length !== 0 &&
							state.Orders.map((Order) => (
								<SingleOrder
									Order={Order}
									key={Order.OrderId}
									onView={onView}
									onCancel={onCancel}
								/>
							))}
					</Container>
				</motion.div>
			</AnimatePresence>
			{state.OrderInView !== null && (
				<OrderView closeView={closeView} order={state.OrderInView} />
			)}
		</React.Fragment>
	);
};
const Container = styled.div`
	width: 100%;
	height: calc(100vh - 90px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	color: white;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 0px;
	}
`;

export default MyOrders;
