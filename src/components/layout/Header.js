import { Link, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import logo from "../../images/logo2.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CiMenuBurger } from "react-icons/ci";

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
  useEffect(() => {
    const handleStorageChange = () => {
      // Handle changes in sessionStorage, if necessary
      console.log("userPic변경");
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
              {userRole === "ROLE_USER" ? (
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
            {userRole === "ROLE_USER" || (
              <>
                <Link to={`/admin?manage=meeting&num=1`}>모임관리</Link>
                <Link to={`/admin?manage=review`}>후기관리</Link>
                <Link to={`/admin?manage=service`}>서비스 통계</Link>
              </>
            )}
          </li>
          <li>
            <Link to={`rank?rank=total`}>전체랭킹</Link>
            <Link>월별랭킹</Link>
            <Link>카테고리별 랭킹</Link>
          </li>
          <li>
            <Link to={`/review`}>커뮤니티 후기</Link>
          </li>
          <li>
            <div onClick={() => {}}>내 모임관리</div>
            <div onClick={() => {}}>모임생성</div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
