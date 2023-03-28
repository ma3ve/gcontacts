// pages/api/auth/[...nextauth].ts

import NextAuth, { Account, AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const options: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				url: 'https://accounts.google.com/o/oauth2/auth',
				params: {
					prompt: 'consent',
					scope:
						'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/contacts.readonly',
				},
			},
		},
		)
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
	},
};

export default NextAuth(options);