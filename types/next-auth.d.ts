import { JWT } from "next-auth/jwt"
import NextAuth from "next-auth";

declare module "next-auth/jwt"{
    interface JWT{
        accessToken?: string
    }
}

declare module "next-auth"{
    interface Session{
        user:{
            accessToken: string
        }
    }
}