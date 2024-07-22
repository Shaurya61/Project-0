import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {db} from './db';
import{compare} from 'bcrypt';
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(db),
    pages:{
        signIn:'/sign-in',
      },
    session:{
        strategy:'jwt'
    },
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "mail@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null;
            }
         const existingUser=await db.user.findUnique({
            where:{email:credentials?.email}
         });
           if(!existingUser){
            return null;
           }
           if(existingUser.password){
             const passwordMatch= await compare(credentials.password,existingUser.password);
             if(!passwordMatch){
              return null;
             }
           }
           return {
            id: `${existingUser.id}`,
            username: existingUser.username,
            email: existingUser.email
           }
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
  }


  