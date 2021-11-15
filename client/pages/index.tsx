import React from "react";
import HeadLine from "../components/Home/HeadLine";
import Services from "../components/Home/Services";
import Layout from "../components/Layout/Layout";

export function HomePage() {
	return (
		<React.Fragment>
			<Layout title="Welcome To Burger Builder">
				<HeadLine />
				<Services />
			</Layout>
		</React.Fragment>
	);
}
export default HomePage;
