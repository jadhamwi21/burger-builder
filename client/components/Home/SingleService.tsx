import React from "react";
import styled from "styled-components";

interface Props {
	title: string;
	path: string;
	content: string;
	iconHeight: string;
	iconWidth: string;
	animationName: string;
	animationDelay: string;
}

const SingleService = ({
	title,
	path,
	content,
	iconWidth,
	iconHeight,
	animationDelay,
	animationName,
}: Props) => {
	return (
		<Wrapper
			data-aos-duration="400"
			data-aos={animationName}
			data-aos-delay={animationDelay}
		>
			<ServiceIcon
				src={path}
				style={{ height: iconHeight, width: iconWidth }}
			/>
			<ServiceTitle>{title}</ServiceTitle>
			<ServiceContent>{content}</ServiceContent>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	height: 275px;
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 768px) {
		margin: 2em 0px;
		width: 100vw;
	}
`;
const ServiceIcon = styled.img``;
const ServiceTitle = styled.h4`
	color: black;
	text-align: center;
`;
const ServiceContent = styled.div`
	color: #bbbbbb;
	text-align: left;
	width: fit-content;
	max-width: 220px;
	font-size: 20px;
`;

export default SingleService;
