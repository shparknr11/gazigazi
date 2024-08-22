import { Link, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import logo from "../../images/logo2.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiMenuBurger } from "react-icons/ci";
import axios from "axios";
import { clearUser } from "../../slices/userSlice";

const Header = () => {
  // const userSeq = sessionStorage.getItem("userSeq");
  // const userPic = sessionStorage.getItem("userPic");
  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
  const userPic = user.userPic;
  const userName = user.userName;
  const userRole = user.userRole;
  // console.log(userRole);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async e => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete("/api/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code === 1) {
        console.log(response.data);
      }
    } catch (error) {
      // 서버와의 통신 중 오류 처리
      const errorMsg =
        error.response?.data?.resultMsg ||
        "오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMsg);
    }

    dispatch(clearUser());
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      // Handle changes in sessionStorage, if necessary
      // console.log("userPic변경");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleClickMyMeeting = () => {
    if (!userSeq) {
      navigate("/login");
    } else {
      navigate(`/mymeeting`);
    }
  };
  const handleClickCreateMeeting = () => {
    if (!userSeq) {
      navigate("/login");
    } else {
      navigate(`/meeting/create`);
    }
  };
  const handleClickProfile = () => {
    if (!userSeq) {
      navigate("/login");
    } else {
      navigate(`myprofile/${userSeq}/userInfo`);
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="가지가지" className="header-logo-img" />
          </Link>
        </div>
        <nav className="header-menu">
          <ul className="header-menu-list">
            <li>
              {userRole !== "ROLE_ADMIN" ? (
                <>
                  <Link
                    to="/admin?manage=meeting&num=1"
                    style={{ visibility: "hidden" }}
                  >
                    관리자
                  </Link>
                </>
              ) : (
                <Link to="/admin?manage=meeting&num=1">관리자</Link>
              )}
            </li>
            <li>
              <Link to="/rank?rank=total">랭킹</Link>
            </li>
            <li>
              <Link to="/review">후기</Link>
            </li>
            <li>
              <div
                className="header-menu-item"
                onClick={() => {
                  handleClickMyMeeting();
                }}
              >
                내 모임
              </div>
            </li>
          </ul>
        </nav>
        <div className="header-icon-list">
          {!userSeq ? (
            <>
              <div
                className="header-profileicon-notuser-div"
                onClick={() => {
                  handleClickProfile();
                }}
              >
                <BsPerson />
              </div>
              <div>
                <span className="header-profileicon-notuser-name">
                  로그인이 필요합니다.
                </span>
              </div>
              <div className="header-submenu-mobile">
                <CiMenuBurger />
              </div>
            </>
          ) : (
            <div className="header-profileicon-div">
              <div
                className="header-profileicon"
                onClick={() => {
                  handleClickProfile();
                }}
              >
                <img src={`/pic/user/${userSeq}/${userPic}`} alt="프로필사진" />
              </div>
              <div>
                <span className="header-profileicon-name">{userName} 님</span>
              </div>
              <div className="header-submenu-mobile">
                <CiMenuBurger />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="header-submenu-div">
        <ul className="header-submenu">
          <li>
            {userRole === "ROLE_ADMIN" && (
              <>
                <Link to={`/admin?manage=meeting&num=1`}>모임관리</Link>
                <Link to={`/admin?manage=review`}>후기관리</Link>
                <Link to={`/admin?manage=service`}>서비스 통계</Link>
              </>
            )}
          </li>
          <li>
            <Link to={`rank?rank=total`}>전체랭킹</Link>
            <Link to={`rank?rank=total`}>월별랭킹</Link>
            <Link to={`rank?rank=total`}>카테고리별 랭킹</Link>
          </li>
          <li>
            <Link to={`/review`}>커뮤니티 후기</Link>
          </li>
          <li>
            <div
              className="header-submenu-user"
              onClick={() => {
                handleClickMyMeeting();
              }}
            >
              내 모임관리
            </div>
            <div
              className="header-submenu-user"
              onClick={() => {
                handleClickCreateMeeting();
              }}
            >
              모임생성
            </div>
          </li>
          <li className="header-logout">
            {userRole ? (
              <>
                <div
                  style={{ background: "#efede5", cursor: "pointer" }}
                  onClick={e => {
                    handleLogout(e);
                  }}
                >
                  로그아웃
                </div>
                <Link to={`/myprofile/${userSeq}/myinterestlist`}>찜목록</Link>
                <Link to={`/myprofile/${userSeq}/mymeeting`}>나의 신청서</Link>
                <Link to={`/myprofile/${userSeq}/myreview`}>나의 후기</Link>
              </>
            ) : (
              <>
                <Link style={{ visibility: "hidden" }}>로그아웃</Link>
                <Link style={{ visibility: "hidden" }}>찜목록</Link>
                <Link style={{ visibility: "hidden" }}>나의 신청서</Link>
                <Link style={{ visibility: "hidden" }}>나의 후기</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
