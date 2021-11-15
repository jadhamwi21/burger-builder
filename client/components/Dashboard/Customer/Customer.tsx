import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../../store/store";
import { MenuSelections } from "../../../types/types";
import MakeAnOrder from "./MakeAnOrder/MakeAnOrder";
import Menu from "./Menu";
import MyOrders from "./MyOrders/MyOrders";

const variants = {
	start: {
		opacity: 0,
		x: -50,
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	end: {
		opacity: 0,
		x: -50,
	},
};

const Customer = () => {
	const SelectedOption = useSelector(
		(state: RootState) => state.menuReducer.SelectedMenuOption
	);
	return (
		<React.Fragment>
			<Menu />
			<AnimatePresence exitBeforeEnter={true} initial={false}>
				<motion.div
					variants={variants}
					initial="start"
					animate="animate"
					exit="end"
					style={{ height: "100%", width: "100%" }}
					key={SelectedOption}
					transition={{ ease: "easeOut", duration: 0.2 }}
				>
					{SelectedOption === MenuSelections.MakeAnOrder && <MakeAnOrder />}
					{SelectedOption === MenuSelections.MyOrders && <MyOrders />}
				</motion.div>
			</AnimatePresence>
		</React.Fragment>
	);
};

export default Customer;
