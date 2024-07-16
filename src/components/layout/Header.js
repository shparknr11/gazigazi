import { Link, useNavigate } from "react-router-dom";
import { PiHeartLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import styled from "@emotion/styled";
import logo from "../../images/logo2.png";
import { useRef } from "react";

const Header = () => {
  const userSeq = sessionStorage.getItem("userSeq");
  const userPic = sessionStorage.getItem("userPic");
  const navigate = useNavigate();
  const handleClickProfile = () => {
    if (!userSeq) {
      navigate("/login");
    } else {
      navigate(`/myprofile/${userSeq}`);
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
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/">소개</Link>
            </li>
            <li>
              <Link to="/review">커뮤니티 후기</Link>
            </li>
            <li>
              <Link to="/mymeeting">내 모임</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="header-icon-list">
            <li>
              <Link to="/">
                <div>
                  <PiHeartLight />
                </div>
              </Link>
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
                ></div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
