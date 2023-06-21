export default function Join() {
  return (
    <div>
        <h4>회원가입</h4>
        <form action="/api/post/entry" method="POST">
          <div>
            <label for="title">아이디를 입력하세요</label>
            <input type="text" name="title" id="title" placeholder="아이디는 중복할 수 없습니다" required></input>
          </div>
          <div>
            <label for="content">비밀번호를 입력하세요</label>
            <input type="text" name="content" id="content" placeholder="비밀번호를 입력하세요" required></input>
          </div>
          <button type="submmit">회원가입</button>
        </form>
    </div>
  )
}