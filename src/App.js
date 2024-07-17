import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";
import "./css/reset.css";
import "./css/common.css";
import "./css/footer.css";
import "./css/header.css";
import "./css/main.css";
import Home from "./pages/Home";

import Create from "./pages/meeting/Create";
import Review from "./pages/review/Review";

import MyMeeting from "./pages/mymeeting/MyMeeting";
import MyMeetingNotice from "./pages/mymeeting/MyMeetingNotice";

import Write from "./pages/review/Write";

import MyMeetingFuncLeader from "./pages/mymeeting/MyMeetingFuncLeader";
import MyMeetingFuncUser from "./pages/mymeeting/MyMeetingFuncUser";
import MyMeetingSchDetail from "./pages/mymeeting/MyMeetingSchDetail";
import MyMeetingSchModify from "./pages/mymeeting/MyMeetingSchModify";
import MyMeetingSchResister from "./pages/mymeeting/MyMeetingSchResister";

import Admin from "./pages/admin/Admin";

import MyMeetingSchMemberList from "./pages/mymeeting/MyMeetingSchMemberList";

import MyPage from "./pages/user/MyPage";
import MyMeetingMemberList from "./pages/mymeeting/MyMeetingMemberList";

import Login from "./pages/user/Login";
import CreateAccount from "./pages/user/CreateAccount";
import FindId from "./pages/user/FindId";
import FindPw from "./pages/user/FindPw";
import InfoEdit from "./pages/user/InfoEdit";
import InterestList from "./pages/user/InterestList";

import LogOut from "./pages/user/LogOut";

import MeetingDetail from "./pages/meeting/MeetingDetail";
import CategoryOthers from "./pages/meeting/CategoryOthers";
import MyMeetingNewMemberList from "./pages/mymeeting/MyMeetingNewMemberList";
import Modify from "./pages/meeting/Modify";
import Search from "./pages/meeting/Search";

const MainStyle = styled.div`
  padding-top: 70px;
  /* background-color: #fefbf7;
  background-color: white;
  background-color: rgba(254, 251, 247, 0.4); */
`;

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainStyle>
        <Routes>
          {/* 담당자 : 황운철 */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<LogOut />}></Route>
          <Route path="/createaccount" element={<CreateAccount />}></Route>
          <Route path="/findid" element={<FindId />}></Route>
          <Route path="/login/findid" element={<FindId />}></Route>
          <Route path="/findpw" element={<FindPw />}></Route>
          <Route path="/login/findpw" element={<FindPw />}></Route>
          <Route path="/info/:userId" element={<InfoEdit />}></Route>

          {/* 담당자 : 박성호 */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/meeting/create" element={<Create />}></Route>
          <Route path="/meeting/:partySeq" element={<MeetingDetail />}></Route>
          <Route path="/meeting/modify/:partySeq" element={<Modify />}></Route>
          {/* <Route path="/search" element={<Search />}></Route> */}
          {/* <Route
            path="/category/:partyGenre"
            element={<CategoryOthers />}
          ></Route> */}
          <Route path="/category" element={<CategoryOthers />}></Route>
          {/* 기타 담당자 : 모두 */}
          <Route path="/myprofile/:userId" element={<MyPage />}></Route>
          <Route
            path="/interestlist/:userId"
            element={<InterestList />}
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
            path="/mymeeting/mymeetingmemberlist/:partySeq"
            element={<MyMeetingMemberList />}
          ></Route>
          <Route
            path="/mymeeting/mymeetingnewmemberlist/:partySeq"
            element={<MyMeetingNewMemberList />}
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
