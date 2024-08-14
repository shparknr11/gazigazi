import styled from "@emotion/styled";
import { Link, useSearchParams } from "react-router-dom";
import MeetingState from "../../components/admin/MeetingState";
import GuideTitle from "../../components/common/GuideTitle";
import { prColor } from "../../css/color";

const AdminWrapStyle = styled.div`
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  min-height: 627px;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const AdminInnerStyle = styled.div`
  display: flex;
`;
const AdminLeftDivStyle = styled.div`
  nav {
    width: 150px;
  }
  ul,
  li {
    width: 100%;
  }
  .admin-list {
  }
  .admin-list-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    background-color: rgba(249, 248, 245, 0.2);

    & .admin-list-item-menu {
      text-align: end;
      width: 100%;
      padding: 10px 16px 10px 24px;
      margin-bottom: 5px;
      background-color: ${prColor.p100};

      a {
        display: block;
        width: 100%;
        height: 100%;
        font-weight: bold;
        font-size: 19px;
      }
    }
    & .admin-list-item-menu:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
    & .admin-list-item-submenu {
      display: flex;
      flex-direction: column;
      min-width: 110px;
      gap: 10px;
      margin: 10px 0px;
      margin-left: 50px;
      & span {
        font-size: 16px;
        color: #000;
        padding: 5px 10px;
      }
      & span:hover {
        color: #000;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;
const AdminRightDivStyle = styled.div`
  margin-left: 50px;
  h1 {
    margin-bottom: 40px;
    font-size: 28px;
  }
  .admin-application-div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .admin-application {
    width: 200px;
    height: 100px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .admin-application-btn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
    }
  }
  .yoffset {
    position: relative;
    /* border: 2px dashed #c9c2a5; */
  }
  .admin-btns {
    position: absolute;
    top: 160px;
    left: 19px;
    display: flex;
    gap: 15px;
    padding: 10px 0px;
    justify-content: end;
    padding-right: 10px;
    opacity: 0;
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
  .yoffset:hover .admin-btns {
    opacity: 1;
    transform: translateY(-15px);
  }

  /* .yoffset {
    opacity: 1;
    transform: translateY(-65px);
  } */
`;

const Admin = () => {
  const [searchParams] = useSearchParams();
  const meetingState = searchParams.get("num");
  const manage = searchParams.get("manage");

  const getMeetingSubtitle = meetingState => {
    switch (manage) {
      case "meeting":
        return "🔒 모임관리";
      case "review":
        return "🔒 리뷰관리";
      case "service":
        return "🔒 서비스관리";
    }
  };

  return (
    <AdminWrapStyle>
      <GuideTitle guideTitle="관리자 페이지" subTitle={getMeetingSubtitle()} />
      <AdminInnerStyle>
        <AdminLeftDivStyle>
          <nav>
            <ul className="admin-list">
              <li className="admin-list-item">
                <div className="admin-list-item-menu">
                  <Link to={`/admin?manage=meeting&num=1`}>모임 관리</Link>
                </div>
                <div className="admin-list-item-submenu">
                  <span>
                    <Link to={`/admin?manage=meeting&num=1`}>
                      승인대기 모임
                    </Link>
                  </span>
                  <span>
                    <Link to={`/admin?manage=meeting&num=2`}>승인된 모임</Link>
                  </span>
                  <span>
                    <Link to={`/admin?manage=meeting&num=3`}>반려된 모임</Link>
                  </span>
                  <span>
                    <Link to={`/admin?manage=meeting&num=4`}>삭제된 모임</Link>
                  </span>
                </div>
              </li>

              <li className="admin-list-item">
                <div className="admin-list-item-menu">
                  <Link to={`/admin?manage=review`}>후기 관리</Link>
                </div>
              </li>
              <li className="admin-list-item">
                <div className="admin-list-item-menu">
                  <Link to={`/admin?manage=service`}>서비스 관리</Link>
                </div>
              </li>
            </ul>
          </nav>
        </AdminLeftDivStyle>
        <AdminRightDivStyle>
          {meetingState && <MeetingState meetingState={meetingState} />}
        </AdminRightDivStyle>
      </AdminInnerStyle>
    </AdminWrapStyle>
  );
};

export default Admin;
