// pages/api/users.js
//@ts-ignore
import clientPromise from '../../../lib/mongodb';

export async function POST(req:any)
{
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); // use your database name
  console.log('in post')
 
  const { teamname, members } = await req.json();
  const newTeam= {
    teamname,
    members
  };
  const existingteam = await db.collection('teams').findOne({ teamname:teamname });
  if (existingteam) {
    return Response.json({
      message:"team name already exists",
      team:existingteam
    })
  }

  console.log(`new team is ${teamname} `)
  if(!teamname )
    return Response.json({
        message:'error!! required field teamname not found'
    })

  const teams = await db.collection('teams').insertOne(newTeam);
 
  // res.json(users);
  //@ts-ignore
  return Response.json({
    message:"team added successfully",
    team:teams
  })
}
