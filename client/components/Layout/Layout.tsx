import React from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/server/router";

interface Props {
	children: React.ReactNode;
	title: string;
}

const Layout = ({ title, children }: Props) => {
	return (
		<React.Fragment>
			<NextSeo title={title} />
			{children}
		</React.Fragment>
	);
};

export default Layout;
