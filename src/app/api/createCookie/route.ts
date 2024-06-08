// pages/api/users.js
//@ts-ignore
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req:NextRequest)
{
    const {name}=await req.json()
    console.log(name)
 return new Response("<h1>api in create Cookie</h1>",{
    headers:{
        "Set-Cookie":`authCookie=${name}`
    }
 })

}

