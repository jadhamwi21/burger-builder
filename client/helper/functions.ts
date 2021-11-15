import { TokenPayloadInterface } from "../types/types";
import jwtDecode from "jwt-decode";

export const Delay = (seconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const IgnoreCaseComparision = (str1: string, str2: string) => {
	return str1.toLowerCase() === str2.toLowerCase();
};

export const JWTDecode = (token: string) => {
	const tokenPayload = jwtDecode<TokenPayloadInterface>(token);
	return tokenPayload;
};

export const BooleanToYesOrNo = (value: boolean) => {
	return value === true ? "Yes" : "No";
};
