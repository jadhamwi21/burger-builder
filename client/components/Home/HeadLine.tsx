import React from "react";
import styled from "styled-components";
import Link from "next/link";

const HeadLine = () => {
	return (
		<HeadlineContainer>
			<HeadlineDetailsWrapper>
				<HeadlineTitle>Looking For Your Own Burger Desire?</HeadlineTitle>
				<HeadlineContent>
					Start Building Your First Burger And Order It Online
				</HeadlineContent>
				<Link href="/signup" passHref>
					<StartButton>Start!</StartButton>
				</Link>
			</HeadlineDetailsWrapper>
		</HeadlineContainer>
	);
};

const HeadlineContainer = styled.div`
	position: relative;
	height: 800px;
	width: 100%;
	background-image: url("./HeadLineWallpaper.jpg");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	@media (max-width: 768px) {
		background-size: 100% auto;
		height: 300px;
	}
	@media (max-width: 480px) {
		background-size: 100% 100%;
	}
`;

const HeadlineDetailsWrapper = styled.div`
	position: absolute;
	top: 28%;
	left: 15%;
	transform: translate(-10%, -30%);
	color: white;
	@media (max-width: 768px) {
		font-size: 0.75em;
	}
`;

const HeadlineTitle = styled.h1`
	width: auto;
	max-width: 400px;
`;
const HeadlineContent = styled.div`
	width: auto;
	max-width: 250px;
`;

const StartButton = styled.button`
	outline: none;
	border: none;
	background-color: white;
	padding: 10px 30px;
	border-radius: 20px;
	font-size: 18px;
	margin-top: 2.25em;
	cursor: pointer;
`;

export default HeadLine;
