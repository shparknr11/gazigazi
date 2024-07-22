import styled from "@emotion/styled";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./css/reset.css";
import "./App.css";
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

import MyMeetingMemberList from "./pages/mymeeting/MyMeetingMemberList";
import MyPage from "./pages/user/MyPage";

import CreateAccount from "./pages/user/CreateAccount";
import InfoEdit from "./pages/user/InfoEdit";
import InterestList from "./pages/user/InterestList";
import Login from "./pages/user/Login";
import UserInfo from "./pages/user/UserInfo";

import LogOut from "./pages/user/LogOut";

import CategoryOthers from "./pages/meeting/CategoryOthers";
import MeetingDetail from "./pages/meeting/MeetingDetail";
import Modify from "./pages/meeting/Modify";
import MyMeetingNewMemberList from "./pages/mymeeting/MyMeetingNewMemberList";

import FindIdPw from "./pages/user/FindIdPw";
import UserReview from "./pages/user/UserReview";
import NotFoundPage from "./pages/NotFoundPage";
import EventPage from "./pages/meeting/EventPage";
import MyMeetingNoticeResister from "./pages/mymeeting/MyMeetingNoticeResister";

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
          <Route path="/createaccount" element={<CreateAccount />}></Route>
          <Route path="/login/findid:pw" element={<FindIdPw />}></Route>

          {/* 담당자 : 박성호 */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/meeting/create" element={<Create />}></Route>
          <Route path="/meeting/:partySeq" element={<MeetingDetail />}></Route>
          <Route path="/meeting/modify/:partySeq" element={<Modify />}></Route>
          <Route path="/event/:eventId" element={<EventPage />}></Route>
          {/* <Route
            path="/category/:partyGenre"
            element={<CategoryOthers />}
          ></Route> */}
          <Route path="/category" element={<CategoryOthers />}></Route>
          {/* 기타 담당자 : 모두 */}
          <Route path="/myprofile/:userId" element={<MyPage />}>
            <Route path="userInfo" element={<UserInfo />}></Route>
            <Route path="infoEdit" element={<InfoEdit />}></Route>
            <Route path="myreview" element={<UserReview />}></Route>
            <Route path="logout" element={<LogOut />}></Route>
            <Route path="myinterestlist" element={<InterestList />}></Route>
          </Route>

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
            path="/mymeeting/mymeetingnoticeresister"
            element={<MyMeetingNoticeResister />}
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

          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </MainStyle>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
