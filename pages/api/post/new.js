import { connectDB } from "@/util/database"

export default async function handler(req, res) {
  
  if(req.method === "POST") {
    console.log('/api/post/new.js에서 실행합니다');
    console.log(req.body);

    if(!req.body.title || !req.body.content) {
      return res.status(500).json('제목 또는 내용을 입력해주세요');  
    }

    const db = (await connectDB).db('board');
    //let result = 
    await db.collection('post').insertOne(req.body);
    
    //return res.status(200).json('작성완료');
    return res.redirect(302, '/list');
  } else {
    return res.status(400);
  }
    
}