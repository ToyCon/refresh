import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log('/pages/api/comment/write.js에서 실행합니다');
  console.log(req.body);

  let session = await getServerSession(req, res, authOptions);
  console.log('로그인 여부를 확인합니다');
  console.log(session);

  if(!session){
    return res.status(400).json('로그인해주세요')
  }

  if(req.method === 'POST') {
    req.body = JSON.parse(req.body);
    // console.log(req.body);
    
    if(!req.body.comment || !req.body.postId) {
      // console.log('body가 잘못됨')
      return res.status(400).json('필수 항목이 빠졌습니다')
    }
    
    const db = (await connectDB).db("board");
    let result = await db.collection("comment").
      insertOne({comment: req.body.comment, name: session.user.name, author: session.user.email, postId: new ObjectId(req.body.postId)});
    console.log(result);

    if(result.acknowledged) {
      return res.status(200).json(result);
      // return res.redirect(302, '/list');
    } else {
      return res.status(500).json('작성을 완료하지 못했습니다')
    }
    
  } else {
    return res.status(400).json('잘못된 요청입니다')
  }
}