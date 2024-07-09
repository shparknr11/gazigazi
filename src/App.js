import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./css/common.css";
import "./css/footer.css";
import "./css/header.css";
import "./css/main.css";
import "./css/reset.css";
import Home from "./pages/Home";

import Create from "./pages/meeting/Create";
import Review from "./pages/review/Review";

import MyMeeting from "./pages/mymeeting/MyMeeting";
import MyMeetingNotice from "./pages/mymeeting/MyMeetingNotice";

import Category from "./pages/meeting/Category";
import Detail from "./pages/meeting/Detail";
import Write from "./pages/review/Write";

import MyMeetingFuncLeader from "./pages/mymeeting/MyMeetingFuncLeader";
import MyMeetingFuncUser from "./pages/mymeeting/MyMeetingFuncUser";
import MyMeetingSchDetail from "./pages/mymeeting/MyMeetingSchDetail";
import MyMeetingSchModify from "./pages/mymeeting/MyMeetingSchModify";
import MyMeetingSchResister from "./pages/mymeeting/MyMeetingSchResister";

import Admin from "./pages/admin/Admin";

import MyMeetingSchMemberList from "./pages/mymeeting/MyMeetingSchMemberList";


import MyPage from "./pages/user/MyPage";


const MainStyle = styled.div`
  padding-top: 70px;
`;

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainStyle>
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
          <Route path="/meeting/create" element={<Create />}></Route>
          <Route path="/meeting/:meetingId" element={<Detail />}></Route>
          <Route
            path="/meeting/modify/:meetingId"
            element={<h1>모임수정페이지</h1>}
          ></Route>
          <Route path="/search" element={<h1>검색페이지</h1>}></Route>
          <Route path="/category" element={<Category />}></Route>

          {/* 기타 담당자 : 모두 */}
          <Route path="/myprofile/:userId" element={<MyPage />}></Route>
          <Route
            path="/interestlist/:userId"
            element={<h1>찜목록페이지</h1>}
          ></Route>

          <Route path="/review" element={<Review />}></Route>
          <Route
            path="/review/:boardId"
            element={<h1>커뮤상세페이지</h1>}
          ></Route>
          <Route path="/review/write" element={<Write />}></Route>
          <Route
            path="/review/modify/:boardId"
            element={<h1>커뮤수정페이지</h1>}
          ></Route>

          <Route path="/admin" element={<Admin />}></Route>

          {/* 담당자 : 윤성환 */}
          {/* 일단 쿼리스트링 이런건 고려 안하고 작성 */}
          <Route path="/mymeeting" element={<MyMeeting />}></Route>
          <Route
            path="/mymeeting/mymeetinguser/:meetingId"
            element={<MyMeetingFuncUser />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingLeader/:meetingId"
            element={<MyMeetingFuncLeader />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingnotice/:meetingnoticeId"
            element={<MyMeetingNotice />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingmemberlist/:meetingmemberlistId"
            element={<MyMeetingMemberList />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingschdetail/:meetingschid"
            element={<MyMeetingSchDetail />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingschmodify/:meetingschid"
            element={<MyMeetingSchModify />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingSchresister"
            element={<MyMeetingSchResister />}
          ></Route>

          <Route
            path="/mymeeting/mymeetingschmemberlist/:meetingMemberlistid"
            element={<MyMeetingSchMemberList />}
          ></Route>

          <Route path="*" element={<h1>404 잘못된 경로입니다.</h1>}></Route>
        </Routes>
      </MainStyle>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
