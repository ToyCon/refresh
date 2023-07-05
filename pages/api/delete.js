import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  console.log('/pages/api/delete.js에서 실행합니다');
  console.log(req.body);

  let session = await getServerSession(req, res, authOptions);
  console.log('로그인 여부를 확인합니다');
  console.log(session);
  if(!session) {
    return res.status(400).json('로그인해주세요');
  }

  if(req.method === 'POST') {
    
    let { _id, author } = JSON.parse(req.body);

    if(!_id) {
      return res.status(400).json('게시물 id가 없습니다')
    }
    
    if(author !== session.user.email){
      return res.status(400).json('작성글이 아닙니다')
    }

    const db = (await connectDB).db("board");
    let result = await db.collection('post').deleteOne({_id: new ObjectId(_id)});
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