import Auth0Provider from "next-auth/providers/auth0";
export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      id: "auth0",
      name: "Auth0",
      type: "oauth",
      authorization: { params: { scope: "openid email profile" } },
      checks: ["pkce", "state"],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.nickname,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
