import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
	route: string;
	children: React.ReactNode;
}

const PageTransition = ({ children, route }: Props) => {
	return (
		<AnimatePresence
			exitBeforeEnter={true}
			initial={false}
			onExitComplete={() => window.scrollTo(0, 0)}
		>
			<motion.main
				initial={{ opacity: 0, x: -5 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 5 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				key={route}
			>
				{children}
			</motion.main>
		</AnimatePresence>
	);
};

export default PageTransition;
