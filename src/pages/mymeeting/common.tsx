// let currentPage = 1;
// const todosPerPage = 9;
// const handleNextScroll = currentTodos => {
//   // 다음페이지 가기
//   console.log(currentPage);
//   console.log(currentTodos);
// };
// window.addEventListener("scroll", () => {
//   // 스크롤 값 구해서 내릴 때 마다 + 하면서 위로 쏘면됨.
//   let WscrollY = 100 * currentPage;
//   const totalPages = Math.ceil(res.length / todosPerPage);
//   const indexStart = (currentPage - 1) * todosPerPage;
//   const currentTodos = res.slice(indexStart, indexStart + todosPerPage);
//   console.log(window.scrollY >= WscrollY);
//   if (window.scrollY <= WscrollY) return;
//   currentPage = currentPage + 1;
//   if (currentTodos.length > 0) {
//     // TODO: 중요 사항 : ...currentTodos로 뜯어서 넣을 경우 넣는 데이터가 2배로 들어감 이거만 해결하면 끝
//     console.log(currentTodos);
//     const daats = [...currentTodos, ...currentTodos];
//     setBudgetList(daats);
//     console.log(budgetList);
//   }
//   // else {
//   //   alert("더이상 정보가 없어요.");
//   // }
// });
