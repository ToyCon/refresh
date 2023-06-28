'use client'

import Link from "next/link"

export default function ListItem({ result }) {
  
  return (
    <div>
      {
        result.map((e, i) => {
          return (
            <div className="list-item" key={i}>
              <Link href={`/detail/${e._id}`}>
                <h4>{result[i].title}</h4>
              </Link>
              <Link href={`/edit/${e._id}`}>✏️</Link>
              <span onClick={(ele) => {
                fetch('/api/post/delete', { 
                  method: 'DELETE',
                  body: e._id
                })
                // url 파라미터 문법으로 서버에 삭제요청 보내기
                // fetch(`/api/abc/${e._id}`)
                 .then((res) => {
                  if(res.status === 200) {
                    return res.json();
                  } else {
                    // 서버 에러로 응답 코드가 정상 처리가 아닐 경우 실행할 코드
                    return res.json('게시물을 삭제할 수 없습니다')
                  }
                })
                .then(() => {
                  // 응답에 성공했을 때 실행할 코드, 팝업창 띄워서 추가 정보 보여주기 등
                  ele.target.parentElement.style.opacity = 0; //실제로 html 태그가 지워지지 않지만 투명해지는 효과
                  setTimeout(() => {
                    ele.target.parentElement.style.display = 'none';
                  }, 1000)
                })
                .catch((err) => {
                  //에러 핸들링
                  console.log(err);
                })
              }
              } id={e._id}>🗑️</span>
              <p>1월 1일</p>
            </div>
          )
        })
      }     
    </div>
  )
}