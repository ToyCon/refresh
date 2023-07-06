import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  console.log('/api/auth/signup.js에서 실행합니다');
  //body 전체를 console.log를 찍으면 최초에 전송된 pw가 로그에 남음
  //개발 환경에서만 console.log를 쓰고 빌드할때는 
  //console.table(req.body.email, req.body.name, Boolean(req.body.password))
  console.log(req.body);

  //회원 가입 요청할 때 반드시 필요한 정보 확인하기
  //1단계 아이디가 공백이거나 특수문자 여부인지 확인
  //if(){ 정규표현식으로 체크, 조건을 하나라도 통과하지 못하면 res.status(400).json('올바른 id를 입력해주세요')}

  //2단계 비밀번호가 이상할 경우
  //if(){ 정규표현식으로 체크, 조건을 하나라도 통과하지 못하면 res.status(400).json('올바른 비밀를 입력해주세요')}

  //3단계 이메일 양식이 아닐 경우, 또는 겹칠 경우
  //if() {이메일 체크하는 JS 정규표현식은 인터넷에서 검색해볼것,
  // + 이메일 검색 과정, 겹치면 (이메일 겹칩니다)
  // 일치하지 않으면 res.status(400).json('올바른 메일 주소를 입력해주세요')}

  //3단계를 모두 통과하지 못하면 회원 가입을 할 수 없으므로 순서대로 체크
  if(req.method === 'POST') {
    
    let hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    req.body.password = hash;

    let db = (await connectDB).db('board');
    await db.collection('user_cred').insertOne(req.body);

    return res.status(200).json('가입완료');
  }
}