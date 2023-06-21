export default function handler(req, res) {
  
  if(req.method === "POST") {
    console.log('/api/test에서 실행합니다');
    console.table(req.body.title);
    console.table(req.body.content);
    return res.status(200).json('작성완료');
  }
    
  /*if(req.method === "GET") {
    return res.status(200).json('읽기완료');
  } 작동 확인*/
  // 1./api/list로 get method 요청하면 DB에 있던 post 컬렉션의 모든 데이터 보내주기
  // list.js 만들어서 작동확인
  // 2. 현재시간 보내주는 서버기능 만들기
  if(req.method === "GET") {
    let serverTime = new Date();
    console.log('/api/test에서 실행합니다');
    return res.status(200).json(serverTime.toString());
  }
  // 3. 글 발행기능 완성해오기
  ///write/page.js에서 완성
}