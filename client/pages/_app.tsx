import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Layout/Header";
import React from "react";
import PageTransition from "../components/Layout/PageTransition";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { io } from "socket.io-client";

export const socket = io("https://burger-builder2.herokuapp.com");

function MyApp({ Component, pageProps, router }: AppProps) {
	return (
		<React.Fragment>
			<Provider store={store}>
				<Header />
				<PageTransition route={router.route}>
					<Component {...pageProps} />
				</PageTransition>
			</Provider>
		</React.Fragment>
	);
}
export default MyApp;
