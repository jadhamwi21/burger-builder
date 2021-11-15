import axios from "axios";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetBurgerState } from "../../slices/burger";
import { closeMenu } from "../../slices/menu";
import { resetOrderState } from "../../slices/order";
import { RootState } from "../../store/store";

const Header = () => {
	const Router = useRouter();
	const [cookies, setCookie, removeCookie] = useCookies(["remember_me"]);
	const { isAuthenticated } = useSelector(
		(state: RootState) => state.userReducer
	);
	const dispatch = useDispatch();
	return (
		<Container>
			<AppTitle
				onClick={() => {
					if (Router.pathname === "/dashboard") {
						return;
					} else {
						Router.push("/");
					}
				}}
			>
				<Link href="/">Burger Builder</Link>
			</AppTitle>
			{Router.pathname === "/" && (
				<NavigationWrapper>
					<Link href="/signup" passHref>
						<SignUpButton>Sign up</SignUpButton>
					</Link>
					<Link
						href={cookies.remember_me === "true" ? "/dashboard" : "/signin"}
						passHref
					>
						<SignInElement>Sign in</SignInElement>
					</Link>
				</NavigationWrapper>
			)}
			{isAuthenticated && (
				<LogoutElement
					onClick={() => {
						axios
							.delete("https://burger-builder2.herokuapp.com/user/logout", {
								withCredentials: true,
							})
							.then(() => {
								Router.push("/signin");
								dispatch(resetBurgerState());
								dispatch(resetOrderState());
								dispatch(closeMenu());
							})
							.catch((e) => {
								console.log(e);
							});
					}}
				>
					Logout
				</LogoutElement>
			)}
		</Container>
	);
};

const Container = styled.header`
	height: 90px;
	background-color: #0e0e0e;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0px 2.5em;
	@media (max-width: 768px) {
		flex-direction: column;
		height: fit-content;
		padding: 1em;
	}
`;

const AppTitle = styled.h2`
	color: white;
	cursor: pointer;
`;

const NavigationWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 200px;
	justify-content: space-between;
	@media (max-width: 768px) {
		width: 90%;
	}
`;

const SignUpButton = styled.button`
	border: none;
	outline: none;
	font-size: 18px;
	border-radius: 20px;
	padding: 10px 20px;
	cursor: pointer;
	background-color: white;
`;

const SignInElement = styled.div`
	color: white;
	cursor: pointer;
	font-size: 18px;
	&:hover {
		text-decoration: underline;
	}
`;

const LogoutElement = styled.div`
	text-decoration: underline;
	color: white;
	cursor: pointer;
`;

export default Header;
