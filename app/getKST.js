export default function getKST(postId){
  return new Date(parseInt(postId.substring(0, 8), 16) * 1000);
}