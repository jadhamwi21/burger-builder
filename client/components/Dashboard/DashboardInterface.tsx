import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Verification from "./Customer/Verification";
import { RootState } from "../../store/store";

const DashboardInterface = () => {
	const { isVerified } = useSelector((state: RootState) => state.userReducer);
	return <div>{isVerified ? <Dashboard /> : <Verification />}</div>;
};

export default DashboardInterface;
