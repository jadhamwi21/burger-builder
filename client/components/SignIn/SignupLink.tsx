import React from "react";
import styled from "styled-components";
import Link from "next/link";

const SignupLink = () => {
	return (
		<Container>
			<NotAMember>Not A Member?</NotAMember>

			<Link href="/signup" passHref>
				<SignupLinkElement>Sign up</SignupLinkElement>
			</Link>
		</Container>
	);
};

const Container = styled.div`
	width: fit-content;
	height: fit-content;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: black;
	font-size: 14px;
`;

const NotAMember = styled.p`
	padding-right: 0.5em;
`;
const SignupLinkElement = styled.p`
	text-decoration: underline;
	cursor: pointer;
`;

export default SignupLink;
