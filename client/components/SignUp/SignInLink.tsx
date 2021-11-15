import React from "react";
import styled from "styled-components";
import Link from "next/link";

export const SignInLink = () => {
	return (
		<Container>
			<AlreadyAMember>Already A Member?</AlreadyAMember>
			<Link href="/signin" passHref>
				<SigninLink>Sign in</SigninLink>
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
	@media (max-width: 768px) {
		margin-top: 1.5em;
	}
`;

const AlreadyAMember = styled.p`
	padding-right: 0.5em;
`;
const SigninLink = styled.p`
	text-decoration: underline;
	cursor: pointer;
`;
