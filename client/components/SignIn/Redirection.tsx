import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";

interface Props {}

const Redirection = (props: Props) => {
	const Router = useRouter();
	useEffect(() => {
		Router.push("/dashboard");
	}, []);
	return null;
};

export default Redirection;
