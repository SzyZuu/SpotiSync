import {type NextAuthOptions, Session} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import {JWT} from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            profile: (profile) => {
                console.log('In profile');
                console.log(profile.id);
                return {
                    id: profile.id,
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

        async session({ session, token, profile }: { session: Session; token: JWT }): Promise<Session> {
            if (token.accessToken != null) {
                session.user.accessToken = token.accessToken;
            }
            session.user.id = profile.id
            return session;
        },
    }
}