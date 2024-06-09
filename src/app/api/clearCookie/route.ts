// pages/api/users.js
//@ts-ignore
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt'
export async function GET(req:NextRequest)
{
    req.cookies.delete('authCookie')
 return new Response("<h1>api in create Cookie</h1>",{
    headers:{
        "Set-Cookie":`authCookie=${""}`
    }
 })
}

