// pages/api/users.js
//@ts-ignore
import clientPromise from '../../../lib/mongodb';

export async function PUT(req:any)
{
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); // use your database name
  console.log('in post')
 
  const { teamname,member } = await req.json();
  
  if(!teamname || !member)
    return Response.json({
        message:'error!! required field teamname,member not found'
    })

    const allteams=await db.collection('teams').find({}).toArray()

    for (const team of allteams) {
        const emailExists = team.members.filter((memberinside:any) => memberinside.email === member.email);
        if (emailExists) {
            return Response.json({ message:"email already in another team"});
        }
    }

    const fetchteam=await db.collection('teams').findOne({teamname:teamname})
    if(fetchteam.members.length==3)
        return Response.json({
            message:"team full"
        })

  const teams = await db.collection('teams').updateOne(
    { teamname: teamname },
    { $push: { members: member } }
);
 
  // res.json(users);
  //@ts-ignore
  return Response.json({
    message:"teammate added successfully",
    team:teams
  })
}
