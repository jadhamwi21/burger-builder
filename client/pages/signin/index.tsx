import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import InputComponent from "../../components/Shared/InputComponent";
import SubmitButton from "../../components/Shared/SubmitButton";
import RememberMeCheckbox from "../../components/SignIn/RememberMeCheckbox";
import Redirection from "../../components/SignIn/Redirection";

import useSignIn from "../../hooks/useSignIn";
import SignupLink from "../../components/SignIn/SignupLink";

const SignInPage = () => {
	const {
		handleSubmit,
		handleFieldChange,
		handleRememberMe,
		rememberMeValue,
		emailValue,
		passwordValue,
		FormErrors,
		ValidationToggler,
		isSubmitting,
		isLoggedInFromLastSession,
	} = useSignIn();
	return isLoggedInFromLastSession ? (
		<Redirection />
	) : (
		<Layout title="Sign In">
			<Container>
				<Form onSubmit={handleSubmit}>
					<InputComponent
						name="email"
						value={emailValue}
						label="Email"
						onChange={handleFieldChange}
						error={FormErrors.email}
					/>
					<InputComponent
						name="password"
						value={passwordValue}
						label="Password"
						hidden
						onChange={handleFieldChange}
						error={FormErrors.password}
					/>
					<RememberMeCheckbox
						checked={rememberMeValue}
						handleChange={handleRememberMe}
					/>
					<SubmitButton
						onClick={ValidationToggler}
						Submitting={isSubmitting}
						content="Sign In"
						margin="2em 0px"
					/>
					<SignupLink />
				</Form>
			</Container>
		</Layout>
	);
};
const Container = styled.div`
	display: grid;
	place-items: center;
	height: 90vh;
	width: 100%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: fit-content;
`;

export default SignInPage;
