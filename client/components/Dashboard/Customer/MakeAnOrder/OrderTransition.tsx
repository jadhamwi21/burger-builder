import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
	children: any;
	motionKey: any;
}

const variants = {
	hidden: { opacity: 0 },
	in: { opacity: 1 },
	out: {
		opacity: 0,
	},
};

const OrderTransition = ({ children, motionKey }: Props) => {
	return (
		<AnimatePresence exitBeforeEnter={true} initial={false}>
			<motion.div
				key={motionKey}
				initial="hidden"
				animate="in"
				exit="out"
				variants={variants}
				transition={{ ease: "easeOut", duration: 0.2 }}
				style={{ height: "100%", width: "100%" }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default OrderTransition;
