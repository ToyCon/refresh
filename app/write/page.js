export default function Write() {
  return (
    <div className="p-20">
      <div>
        <h4>글작성</h4>
        <form action="/api/post/new" method="POST">
          <div>
            <label for="title">글 제목을 입력하세요</label>
            <input type="text" name="title" id="title" placeholder="글 제목을 입력하세요" required></input>
          </div>
          <div>
            <label for="content">글 내용을 입력하세요</label>
            <input type="text" name="content" id="content" placeholder="글 내용을 입력하세요" required></input>
          </div>
          <button type="submmit">글 작성하기</button>
        </form>
      </div>
      <p></p>
      <div>
        <form action="/api/list" method="GET">
          <button type="submmit">글 불러오기</button>
        </form>
      </div>
      <p></p>
      <div>
        <form action="/api/test" method="GET">
          <button type="submmit">현재 시간 받아오기</button>
        </form>
      </div>      
    </div>
  )
}