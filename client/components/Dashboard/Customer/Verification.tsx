import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import useVerificationListener from "../../../hooks/useVerificationListener";

const Verification = () => {
	const onClickHandler = () => {
		axios
			.get(
				`https://burger-builder2.herokuapp.com/user/resend_verification_email`,
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	useVerificationListener();
	return (
		<Container>
			<Wrapper>
				<Header>Email Verification</Header>
				<Message>
					Please click on the link we have sent you on your email
				</Message>
				<ResendMessage>
					did not receive an email?{" "}
					<ResendLink onClick={onClickHandler}>click here to resend</ResendLink>
				</ResendMessage>
			</Wrapper>
		</Container>
	);
};
const Container = styled.div`
	height: 90vh;
	width: 100%;
	display: grid;
	place-items: center;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Header = styled.h4`
	color: #2d2ddf;
`;
const Message = styled.p`
	font-size: 17px;
`;

const ResendMessage = styled.div`
	font-size: 14px;
	margin-top: 2em;
`;

const ResendLink = styled.span`
	cursor: pointer;
	text-decoration: underline;
	transition: all 0.05s ease;
	&:hover {
		opacity: 0.9;
	}
	&:active {
		color: #2d2ddf;
		opacity: 1;
	}
`;

export default Verification;
