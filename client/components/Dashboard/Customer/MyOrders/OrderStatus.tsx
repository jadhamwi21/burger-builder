import React from "react";
import styled from "styled-components";

interface Props {
	status: "pending" | "delivered" | "cancelled" | "in cook";
}

const OrderStatus = ({ status }: Props) => {
	return (
		<React.Fragment>
			{status === "pending" && <Status color="#3535ff">Pending</Status>}
			{status === "delivered" && <Status color="green">Delivered</Status>}
			{status === "cancelled" && <Status color="red">Cancelled</Status>}
			{status === "in cook" && <Status color="green">In Cook</Status>}
		</React.Fragment>
	);
};

const Status = styled.span<{ color: string }>`
	width: 150px;
	text-align: left;
	color: ${(props) => props.color};
`;

export default OrderStatus;
