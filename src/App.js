import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import "./css/header.css";
import "./css/main.css";
import "./css/footer.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import styled from "@emotion/styled";
import Home from "./pages/Home";
import MyMeeting from "./pages/mymeeting/MyMeeting";
import MyMeetingFunc from "./pages/mymeeting/MyMeetingFunc";
import MyMeetingNotice from "./pages/mymeeting/MyMeetingNotice";

const MainStyle = styled.div`
  padding-top: 70px;
`;
const MainInnerStyle = styled.div`
  width: 100%;
  max-width: 1920px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainStyle>
        <MainInnerStyle>
          <Routes>
            {/* 담당자 : 황운철 */}
            <Route path="/login" element={<h1>로그인페이지</h1>}></Route>
            <Route
              path="/createaccount"
              element={<h1>회원가입페이지</h1>}
            ></Route>
            <Route path="/findid" element={<h1>아이디찾기</h1>}></Route>
            <Route path="/findpw" element={<h1>비밀번호찾기</h1>}></Route>

            {/* 담당자 : 박성호 */}
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/meeting/create"
              element={<h1>모임등록페이지</h1>}
            ></Route>
            <Route
              path="/meeting/:meetingId"
              element={<h1>모임상세페이지</h1>}
            ></Route>
            <Route
              path="/meeting/modify/:meetingId"
              element={<h1>모임수정페이지</h1>}
            ></Route>
            <Route path="/search" element={<h1>검색페이지</h1>}></Route>
            <Route path="/category" element={<h1>카테고리 페이지</h1>}></Route>

            {/* 기타 담당자 : 모두 */}
            <Route
              path="/myprofile/:userId"
              element={<h1>마이페이지</h1>}
            ></Route>
            <Route
              path="/interestlist/:userId"
              element={<h1>찜목록페이지</h1>}
            ></Route>

            <Route path="/review" element={<h1>커뮤니티 페이지</h1>}></Route>
            <Route
              path="/review/:boardId"
              element={<h1>커뮤상세페이지</h1>}
            ></Route>
            <Route
              path="/review/write"
              element={<h1>커뮤등록페이지</h1>}
            ></Route>
            <Route
              path="/review/modify/:boardId"
              element={<h1>커뮤수정페이지</h1>}
            ></Route>

            {/* 담당자 : 윤성환 */}
            <Route path="/mymeeting" element={<MyMeeting />}></Route>
            <Route
              path="/mymeeting/:meetingId"
              element={<MyMeetingFunc />}
            ></Route>
            <Route
              path="/mymeeting/mymeetingnotice/:meetingNoticeId"
              element={<MyMeetingNotice />}
            ></Route>

            <Route path="*" element={<h1>404 잘못된 경로입니다.</h1>}></Route>
          </Routes>
        </MainInnerStyle>
      </MainStyle>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
