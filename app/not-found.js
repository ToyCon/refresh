import Link from "next/link"

export default function NotFound(){
  return (
    <div>
      <h4>페이지를 찾을 수 없습니다</h4>
      <h4><Link href="/">이곳</Link>을 눌러 메인페이지로 돌아갑니다</h4>
    </div>
  )
}