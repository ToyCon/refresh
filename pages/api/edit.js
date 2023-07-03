import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log('/pages/api/edit.js에서 실행합니다');
  console.log(req.body);

  if(req.method === 'POST') {

    if(!req.body._id) {
        return res.status(400).json('게시물 id가 빠졌습니다')
      }

    if(!req.body.title || !req.body.content) {
      return res.status(400).json('필수 항목이 빠졌습니다')
    }

    const db = (await connectDB).db("board");
    let result = await db.collection('post').
      updateOne({_id: new ObjectId(req.body._id)}, {$set: {title: req.body.title, content: req.body.content}});
    console.log(result);

    if(result) {
      //return res.status(200).json('작성이 완료되었습니다');
      return res.redirect(302, '/list');
    } else {
      return res.status(500).json('작성을 완료하지 못했습니다')
    }
    
  } else {
    return res.status(400).json('잘못된 요청입니다')
  }
}