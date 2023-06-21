import { connectDB } from "@/util/database"

export default async function handler(req, res) {
  
  if(req.method === "POST") {
    console.log('/api/post/entry.js에서 실행합니다');
    console.log(req.body);
    // /entry/page.js에서 보낼 때 title, content로 보냈음

    if(!req.body.title || !req.body.content) {
      return res.status(500).json('아이디와 비밀번호를 입력해주세요');  
    }

    const db = (await connectDB).db('board');
    let result = await db.collection('post').findOne({title: req.body.title});
    console.log(result);

    if(!result) {
      await db.collection('post').insertOne(req.body);
      return res.status(200).json('가입이 완료되었습니다');  
    }
    //return res.status(200).json('작성완료');
    return res.status(200).json('동일한 id가 존재합니다');
  } else {
    return res.status(400);
  }
    
}