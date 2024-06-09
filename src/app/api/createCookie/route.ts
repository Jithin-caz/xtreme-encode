// pages/api/users.js
//@ts-ignore
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'
export async function POST(req:NextRequest)
{
    const saltRounds=7
    const {email}=await req.json()
    const reqstring=await `${process.env.SECRET_ONE}${email}${process.env.SECRET_TWO}`
   
    
   const salt=await bcrypt.genSalt(saltRounds)
   const hashed = await bcrypt.hash(reqstring, salt);
 
 return new Response("<h1>api in create Cookie</h1>",{
    headers:{
        "Set-Cookie":`authCookie=${hashed}`
    }
 })

}

