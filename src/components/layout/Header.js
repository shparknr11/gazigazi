import { Link, useNavigate } from "react-router-dom";
import { PiHeartLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import logo from "../../images/logo2.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  // const userSeq = sessionStorage.getItem("userSeq");
  // const userPic = sessionStorage.getItem("userPic");

  const user = useSelector(state => state.user);
  const userSeq = user.userSeq;
  const userPic = user.userPic;

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
      navigate(`myprofile/:userId/userInfo`);
    }
  };

  const handleclickHeart = () => {
    if (userSeq) {
      navigate(`/myprofile/:userId/myinterestlist`);
    } else {
      navigate(`/login`);
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
              <Link to="/">웹 소개</Link>
            </li>
            <li>
              <Link to="/rank">랭킹</Link>
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
        <nav>
          <ul className="header-icon-list">
            <li>
              <div
                onClick={() => {
                  handleclickHeart();
                }}
              >
                <PiHeartLight />
              </div>
            </li>
            <li>
              {!userSeq ? (
                <div
                  onClick={() => {
                    handleClickProfile();
                  }}
                >
                  <BsPerson />
                </div>
              ) : (
                <div
                  className="header-profileicon"
                  style={{
                    backgroundImage: `url(/pic/user/${userSeq}/${userPic})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  onClick={() => {
                    handleClickProfile();
                  }}
                >
                  {/* <img src={`/pic/user/${userSeq}/${userPic}`} /> */}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-submenu-div">
        <ul className="header-submenu">
          <li>
            <Link>전체랭킹</Link>
            <Link>월별랭킹</Link>
            <Link>카테고리별 랭킹</Link>
          </li>
          <li>
            <Link>전체랭킹</Link>
            <Link>월별랭킹</Link>
            <Link>카테고리별 랭킹</Link>
          </li>
          <li>
            <Link>전체랭킹</Link>
            <Link>월별랭킹</Link>
            <Link>카테고리별 랭킹</Link>
          </li>
          <li>
            <Link>전체랭킹</Link>
            <Link>월별랭킹</Link>
            <Link>카테고리별 랭킹</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
