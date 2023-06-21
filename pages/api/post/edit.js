import { connectDB } from "@/util/database"

export default async function handler(req, res) {
    console.log('/api/post/new.js에서 실행합니다');
    console.log(req.body);

    if(req.method === "PATCH") {
    console.log('/api/post/edit.js에서 실행합니다');
    console.log(req.body);

    if(!req.body.title || !req.body.content) {
        return res.status(500).json('제목 또는 내용을 입력해주세요');  
    }
  
    const db = (await connectDB).db('board');
    let result = await db.collection('post').findOneAndUpdate({title: req.body.title}, req.body);
    console.log(result);

    if(result) {
      return res.status(200).json('수정이 완료되었습니다');  
    }
    return res.redirect(302, `/detail/${req.body.title}`)
    // return res.status(200).json('동일한 id가 존재합니다');
  } else {
    return res.status(400);
  }
    
}