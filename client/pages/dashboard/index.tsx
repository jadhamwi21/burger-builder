import React from "react";
import { useSelector } from "react-redux";
import DashboardInterface from "../../components/Dashboard/DashboardInterface";
import Unauthenticated from "../../components/Dashboard/Unauthenticated";
import useDashboard from "../../hooks/useDashboard";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../store/store";

const Dashboard = () => {
	const { Processing, Authenticated } = useDashboard();
	return (
		<React.Fragment>
			<AnimatePresence initial={false} exitBeforeEnter>
				<motion.div
					key={Processing ? 1 : 0}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{Processing ? (
						<div>Please Wait...</div>
					) : Authenticated ? (
						<DashboardInterface />
					) : (
						<Unauthenticated />
					)}
				</motion.div>
			</AnimatePresence>
		</React.Fragment>
	);
};

export default Dashboard;
