import React from "react";
import styled from "styled-components";
import useAdmin from "../../../hooks/useAdmin";
import CustomerOrder from "./CustomerOrder";
import Filters from "./Filters";

const Admin = () => {
	const { Orders, Loading, Error, Dispatcher, FiltersHandler } = useAdmin();
	return (
		<Container>
			{Loading && <div>Loading...</div>}
			{Error && <div>Error Occured</div>}
			{Orders.length !== 0 ? (
				Orders.map((order) => (
					<CustomerOrder
						Order={order}
						key={order.OrderId}
						dispatcher={Dispatcher}
					/>
				))
			) : !Loading ? (
				<div>No Orders At This Moment</div>
			) : null}
			<Filters FiltersHandler={FiltersHandler} />
		</Container>
	);
};

const Container = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
	height: fit-content;
	width: fit-content;
	gap: 5em;
	margin: 2em auto;
	scroll-behavior: smooth;
	@media (max-width: 768px) {
		padding: 2em 0px;
	}
`;

export default Admin;
