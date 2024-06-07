import clientPromise from '../../../lib/mongodb';
export async function DELETE(req:any)
{
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); // use your database name
  console.log('in post')
 
  const {email,teamname } = await req.json();
 
  console.log(`new user is ${email} `)
  if(!email || !teamname)
    return Response.json({
        message:'error, no email, teamname provided'
    })
    const filter = { email: email };
  const users = await db.collection('users').deleteOne(filter);

    
    const updatedteam=await db.collection('teams').updateOne(
        { teamname: teamname },
        { $pull: { members: { email: email } } })


  if(users.deletedCount === 1)
  return Response.json({
    message:"delete success"
  })
  // res.json(users);
  //@ts-ignore
  return Response.json({
    "message":"delete success",
    user:users,
  })
}
