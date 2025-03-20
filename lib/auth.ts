import {type NextAuthOptions, Session} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import {JWT} from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "user-read-currently-playing user-read-private"
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account }: { token: JWT; account: any }): Promise<JWT> {
            if (account) {
                token.accessToken = account.access_token;
            }

            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            if (token.accessToken) {
                session.user.accessToken = token.accessToken;
            }

            return session;
        },
    }
}