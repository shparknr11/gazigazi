import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h1>로그인페이지</h1>}></Route>
        <Route path="/createaccount" element={<h1>회원가입페이지</h1>}></Route>
        <Route path="/findid" element={<h1>아이디찾기</h1>}></Route>
        <Route path="/findpw" element={<h1>비밀번호찾기</h1>}></Route>

        <Route path="/" element={<h1>홈 페이지</h1>}></Route>

        <Route path="/creatmeeting" element={<h1>모임등록페이지</h1>}></Route>
        <Route
          path="/meeting/:meetingId"
          element={<h1>모임상세페이지</h1>}
        ></Route>
        <Route path="/myprofile/:userId" element={<h1>마이페이지</h1>}></Route>
        <Route
          path="/interestlist/:userId"
          element={<h1>찜목록페이지</h1>}
        ></Route>
        <Route path="/search" element={<h1>검색페이지</h1>}></Route>
        <Route path="/category" element={<h1>카테고리 페이지</h1>}></Route>

        <Route path="/notice" element={<h1>커뮤니티 페이지</h1>}></Route>
        <Route
          path="/notice/:boardId"
          element={<h1>커뮤상세페이지</h1>}
        ></Route>
        <Route path="/notice/write" element={<h1>커뮤등록페이지</h1>}></Route>
        <Route
          path="/notice/modify/:boardId"
          element={<h1>커뮤수정페이지</h1>}
        ></Route>

        <Route path="/mymeeting" element={<h1>내모임페이지 </h1>}></Route>
        <Route
          path="/mymeeting/:meetingId"
          element={<h1>내모임상세페이지</h1>}
        ></Route>

        <Route path="*" element={<h1>404 잘못된 경로입니다.</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
