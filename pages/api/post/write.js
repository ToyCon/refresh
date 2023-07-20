import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  console.log('/pages/api/post/write.js에서 실행합니다');
  // console.log(req.body);

  let session = await getServerSession(req, res, authOptions);
  // console.log('로그인 여부를 확인합니다');
  // console.log(session);

  if(!session){
    return res.status(400).json('로그인해주세요')
  }

  if(req.method === 'POST') {

    if(!req.body.title || !req.body.content) {
      return res.status(400).json('필수 항목이 빠졌습니다')
    }
    
    const db = (await connectDB).db("board");
    let result = await db.collection('post').
      insertOne({title: req.body.title, content: req.body.content, author: session.user.email, postTime: (new Date()).toString(), deleteCheck: 0});
    console.log(result);

    if(result.acknowledged) {
      //return res.status(200).json('작성이 완료되었습니다');
      return res.redirect(302, '/list');
    } else {
      return res.status(500).json('작성을 완료하지 못했습니다')
    }
    
  } else {
    return res.status(400).json('잘못된 요청입니다')
  }
}