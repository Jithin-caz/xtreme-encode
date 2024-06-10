// pages/api/users.js
//@ts-ignore
import clientPromise from '../../../lib/mongodb';

export async function POST(req:any)
{
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); // use your database name
  console.log('in post team create')
 
  const { team, members } = await req.json();
  const newTeam= {
    team,
    members,
    registered:false
  };
  const existingteam = await db.collection('teams').findOne({ team:team });
  if (existingteam) {
    return Response.json({
      message:"team name already exists",
      team:existingteam
    })
  }

  console.log(`new team is ${team} `)
  if(!team )
    return Response.json({
        message:'error!! required field team not found'
    })

  const teams = await db.collection('teams').insertOne(newTeam);
 
  // res.json(users);
  //@ts-ignore
  return Response.json({
    message:"team added successfully",
    team:teams
  })
}
