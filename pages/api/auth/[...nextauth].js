import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "prisma/theClient";

async function authorize(credentials, req) {
  const { email, password } = credentials;
  let user = null;
  const sqlRes = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (sqlRes.password == password) {
    user = {
      id: sqlRes.id,
      email: sqlRes.email,
    };
  }
  return user;
}

const credentialsOptions = {
  type: "credentials",
  credentials: {
    email: {
      label: "email",
      type: "email",
      placeholder: "your@email.com",
    },
    password: {
      label: "password",
      type: "password",
    },
  },
  authorize,
};

const authOptions = {
  session: { jwt: true },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  providers: [CredentialsProvider(credentialsOptions)],
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
