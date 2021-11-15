import React from "react";
import styled from "styled-components";
import { useRouter } from "next/dist/client/router";
import { Delay } from "../../helper/functions";

interface Props {
	CloseModal: () => void;
}

const Modal = ({ CloseModal }: Props) => {
	const Router = useRouter();
	return (
		<Container>
			<ModalElement>
				<div>Successfully Signed Up</div>

				<SignInText
					onClick={async () => {
						CloseModal();
						await Delay(0.3);
						Router.push("/signin");
					}}
				>
					Sign In
				</SignInText>
			</ModalElement>
		</Container>
	);
};
const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4.5px);
	-webkit-backdrop-filter: blur(4.5px);
`;
const ModalElement = styled.div`
	height: fit-content;
	width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5em;

	filter: blur(0px);
	border-radius: 5px;
	background-color: rgba(0, 0, 0, 0.9);
	color: white;
`;

const SignInText = styled.p`
	text-decoration: underline;
	cursor: pointer;
	margin-top: 1em;
`;

export default Modal;
