import NextAuth, { DefaultSession } from "next-auth";
type APIErrorType = {
	name: string;
	message: string;
};
type APIResType<D = any, E = APIErrorType> = {
	error: E,
	data?: undefined
} | {
	error?: undefined;
	data: D
}


declare module "next-auth/JWT" {
	interface JWT {
		accessToken?: string;
	}
}

