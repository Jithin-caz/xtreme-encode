// pages/api/users.js
//@ts-ignore
import clientPromise from '../../lib/mongodb';
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
export async function GET()
{
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); // use your database name
  console.log('in get')
 
  const users = await db.collection('users').find({}).toArray();
  console.log(`users are ${users}`)
  // res.json(users);
  return Response.json({
    users:users
  })
}
