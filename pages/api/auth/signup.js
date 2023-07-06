import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  console.log('/api/auth/signup.js에서 실행합니다');
  //body 전체를 console.log를 찍으면 최초에 전송된 pw가 로그에 남음
  console.log([req.body.email, req.body.name, Boolean(req.body.password)])
  
  //회원 가입 요청할 때 반드시 필요한 정보 확인하기
  //1단계 아이디가 공백이거나 특수문자 포함되어 있는지 확인
  //정규표현식으로 체크, 4글자 이상 20글자 미만, 중복은 허용
  if(!/^[A-Za-z0-9]{4,20}/.test(req.body.name)){
    return res.status(400).json('올바른 이름을 입력해주세요');
  }

  //2단계 비밀번호가 이상할 경우
  //숫자키 특수문자가 포함된 비밀번호 여부를 확인
  //정규 표현식으로 체크, 8글자 이상 20글자 미만
  if(!/^[a-zA-Z\\`d~!@#$%^&*()-_=+]{8,20}$/.test(req.body.password)){
    return res.status(400).json('올바른 비밀번호를 입력해주세요')
  }

  //3단계 이메일 양식이 아닐 경우, 또는 겹칠 경우
  //이메일 양식이 맞는지 먼저 확인
  if(!/[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-z]{2,3}$/.test(req.body.email)) {
    return res.status(400).json('올바른 메일 주소를 입력해주세요')
  }
  //이미 가입한 이메일 주소인지 검색
  let db = (await connectDB).db('board');
  let emailCheck = await db.collection('user_cred').findOne({email: req.body.email});
  console.log(emailCheck);
  if(!!emailCheck) {
    return res.status(400).json('이미 가입한 메일 주소입니다')
  }
  
  //3단계를 모두 통과하지 못하면 회원 가입을 할 수 없으므로 순서대로 체크
  if(req.method === 'POST') {
    
    let hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);
    req.body.password = hash;
    
    req.body.role = 'normal'; //일반 유저 권한 부여

    let result = await db.collection('user_cred').insertOne(req.body);
    console.log(result);

    if(result.acknowledged) {
      //return res.status(200).json('가입완료');
      return res.redirect(302, '/');
    } else {
      return res.status(500).json('DB 오류로 가입할 수 없습니다 다시 시도해주세요');
    }
    
  } else {
    return res.status(400).json('잘못된 요청입니다');
  }
}
