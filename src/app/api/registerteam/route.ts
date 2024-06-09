// pages/api/users.js
//@ts-ignore
import clientPromise from '../../../lib/mongodb';

export async function PUT(req:any)
{
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); // use your database name
  console.log('in post')
 
  const { teamname } = await req.json();
   
  const teams = await db.collection('teams').updateOne(
    { teamname: teamname },
    {$set: { registered: true } }
);
 
  // res.json(users);
  //@ts-ignore
  return Response.json({
    message:"team registration succesfully",
    team:teams
  })
}
