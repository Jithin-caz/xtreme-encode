//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function GET(req:any, res:any)
{
 
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db('data');
  const teams = await db.collection('teamtemp')
  .find({ score: { $ne: 0 }  })
  .sort({ score: -1 }) 
  .toArray();
 
//console.log(teams)
  return new Response(
    JSON.stringify({
      message: "the teams",
      teams
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}