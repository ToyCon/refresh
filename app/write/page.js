export default function Write() {
  return (
    <div className="p-20">
      <h4>작성하기</h4>  
      <form action='/api/write' method="POST">
        <input type="text" name="title" palceholder="글 제목을 입력하세요" required />
        <input type="text" name="content" palceholder="글 내용을 입력하세요" required />  
        <button type='submit'>작성하기</button>
      </form>
    </div>
  )
}