import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log('/api/post/edit.js에서 실행합니다');
  console.log(req.body);

  if(req.method === "POST") {

    if(!req.body.title || !req.body.content) {
        return res.status(500).json('제목 또는 내용을 입력해주세요');  
    }

    let newPost = {
      title: req.body.title,
      content: req.body.content
    }
    
    const db = (await connectDB).db('board');
    let result = await db.collection('post').updateOne(
      {_id: new ObjectId(req.body._id)},{$set: newPost}
    );
    console.log(result);

    if(result) {
      return res.redirect(302, '/list');  
    } else {
      return res.status(500).err('글을 수정할 수 없습니다');
    }
    
  } else {
    return res.status(400);
  }
    
}