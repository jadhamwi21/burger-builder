import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout/Layout";
import InputComponent from "../../components/Shared/InputComponent";
import SubmitButton from "../../components/Shared/SubmitButton";
import GenderSelect from "../../components/SignUp/GenderSelect";
import { SignInLink } from "../../components/SignUp/SignInLink";
import SuccessModal from "../../components/SignUp/SuccessModal";
import useSignUp from "../../hooks/useSignUp";

const Signup = () => {
	const {
		handleChange,
		handleSubmit,
		Toggler,
		values,
		setFieldValue,
		errors,
		isSubmitting,
		signupSuccess,
		setSignupSuccess,
		SignupError,
	} = useSignUp();
	console.log(signupSuccess);
	return (
		<Layout title="Sign Up">
			<Container>
				<Form onSubmit={handleSubmit}>
					<ServerError>{SignupError}</ServerError>
					<InputComponent
						name="firstName"
						value={values.firstName}
						label="First Name"
						onChange={handleChange}
						error={errors.firstName}
					/>
					<InputComponent
						name="lastName"
						value={values.lastName}
						label="Last Name"
						onChange={handleChange}
						error={errors.lastName}
					/>
					<InputComponent
						name="email"
						value={values.email}
						label="Email"
						onChange={handleChange}
						error={errors.email}
					/>
					<InputComponent
						name="password"
						value={values.password}
						label="Password"
						hidden
						onChange={handleChange}
						error={errors.password}
					/>
					<InputComponent
						name="confirmPassword"
						value={values.confirmPassword}
						label="Confirm Password"
						hidden
						onChange={handleChange}
						error={errors.confirmPassword}
					/>
					<GenderSelect
						onChange={handleChange}
						value={values.gender}
						GenderSetter={(value: string) => setFieldValue("gender", value)}
						error={errors.gender}
					/>
					<SubmitButton
						onClick={() => {
							Toggler();
						}}
						Submitting={isSubmitting}
						margin="0em 0px"
						content="Sign up"
					/>
					<SignInLink />
				</Form>
			</Container>
			{signupSuccess && (
				<SuccessModal CloseModal={() => setSignupSuccess(false)} />
			)}
		</Layout>
	);
};

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	width: 100%;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: fit-content;
	width: fit-content;
	margin-top: 4em;
`;

const ServerError = styled.div`
	color: red;
`;

export default Signup;
