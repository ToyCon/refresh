import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log('/pages/api/delete.js에서 실행합니다');
  console.log(req.body);

  if(req.method === 'POST') {
    
    let id = JSON.parse(req.body)._id;

    if(!id) {
      return res.status(400).json('게시물 id가 없습니다')
    }

    const db = (await connectDB).db("board");
    let result = await db.collection('post').deleteOne({_id: new ObjectId(id)});
    console.log(result);

    if(result.acknowledged) {
      //return res.status(200).json('삭제 완료되었습니다');
      return res.redirect(302, '/list');
    } else {
      return res.status(500).json('삭제 할 수 없습니다')
    }
    
  } else {
    return res.status(400).json('잘못된 요청입니다')
  }
}