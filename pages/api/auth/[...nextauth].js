import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'c055f788bc9d30ee2b60',
      clientSecret: '8203024d6265d7c07b874d650249cc6795312874',
    }),
  ],
  secret : 'qaz2ws',
  adapter : MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 