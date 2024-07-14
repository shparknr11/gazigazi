// 로드 됬을 때 강제로 상단 탑으로 이동 시키기
// setTimeout(() => , 100);
// useEffect 부분으로 이동 시켜야함.
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 70);
});
const state = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
let currentPage = 1;
const todosPerPage = 3;

const handleNextScroll = currentTodos => {
  // 다음페이지 가기
  console.log(currentPage);
  console.log(currentTodos);
};
window.addEventListener("scroll", () => {
  // 스크롤 값 구해서 내릴 때 마다 + 하면서 위로 쏘면됨.
  let WscrollY = 400 * currentPage;
  const totalPages = Math.ceil(state.length / todosPerPage);
  console.log(totalPages);
  const indexStart = (currentPage - 1) * todosPerPage;
  const currentTodos = state.slice(indexStart, indexStart + todosPerPage);
  let a = [];
  const b = [...currentTodos, a];
  console.log("indexStart", indexStart);
  console.log(b);
  // 교수님 한테 물어볼 것
  // 무한스크롤
  // %로 잡아야함.
  //  [...currentTodos, currentTodos]
  if (window.scrollY >= WscrollY) {
    currentPage = currentPage + 1;
    if (currentTodos.length > 0) {
      handleNextScroll(currentTodos);
    } else {
      alert("더이상 정보가 없어요.");
    }
  }
});
