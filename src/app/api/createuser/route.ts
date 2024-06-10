// pages/api/users.js
//@ts-ignore
import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
//@ts-ignore
import clientPromise from "../../../lib/mongodb";
import { Validate } from "@/utils/validator";
//@ts-ignore
// export default async function handler(req, res) {
//     //@ts-ignore
//   const client = await clientPromise;
//   const db = client.db('users'); // use your database name

//   switch (req.method) {
//     case 'GET':
//         console.log('in get')
//       const users = await db.collection('users').find({}).toArray();
//       res.json(users);
//       break;
//     case 'POST':
//       const newUser = req.body;
//       const result = await db.collection('users').insertOne(newUser);
//       res.json(result);
//       break;
//     default:
//       res.status(405).end(); // Method Not Allowed
//       break;
//   }
// }
export async function POST(req: NextRequest) {
  // const cookies = req.cookies.get("authCookie");
  const { authemail,name, email, IEEEID, isLead, team } = await req.json();
 
  // if(!cookies)
  // {
  //   return Response.json({
  //     message:"UNAUTHORISED"
  //   })
  // }
  // const validated=await Validate(authemail,cookies?.value)
  // if(!validated)
  // {
  //   return Response.json({
  //     message:"UNAUTHORISED"
  //   })
  // }
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data"); // use your database name
  console.log("in post create user");

 
  
  const newUser = {
    name,
    email,
    IEEEID,
    isLead,
    team,
  };
  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    return Response.json({
      message: "email already exists",
      user: existingUser,
      
    });
  }

  if (isLead && !IEEEID)
    return Response.json({
      message: "create failed. Team lead has no IEEE id",
    });

  console.log(`new user is ${name} ${email} `);

  if (!name || !email || !team)
    return Response.json({
      message: "error!! required fields name, email and team not found",
    });

  const res = await db.collection("users").insertOne(newUser);
   
  // res.json(users);
  //@ts-ignore
  return Response.json({
    message: "user added successfully",
    user: res,
  });
}
