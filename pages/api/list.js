import { connectDB } from "@/util/database"

export default async function handler(req, res) {

  if(req.method === "GET") {
    const db = (await connectDB).db('board');
    let result = await db.collection('post').find().toArray();
    console.log('/api/list에서 실행합니다')
    return res.status(200).json(result);
  } else {
    return res.status(400);
  }

}