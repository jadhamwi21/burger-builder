import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import Admin from "./Admin/Admin";
import Customer from "./Customer/Customer";

const Dashboard = () => {
	const { Role } = useSelector((state: RootState) => state.userReducer);
	return <Container>{Role === "admin" ? <Admin /> : <Customer />}</Container>;
};

const Container = styled.div`
	height: calc(100vh - 90px);
	width: 100%;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 0px;
	}
	background-color: #0e0e0e;
`;

export default Dashboard;
