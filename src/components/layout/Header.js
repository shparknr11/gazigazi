import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import styled from "@emotion/styled";
import logo from "../../images/logo2.png";
const HeaderIconStyle = styled.div`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    const userSeq = localStorage.getItem("userSeq");
    if (!userSeq) {
      // userSeq가 있으면 로그인된 상태로 간주하여 '/login' 페이지로 이동
      navigate("/login");
    } else {
      // userSeq가 없으면 비로그인 상태로 간주하여 '/mypage' 페이지로 이동
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
                <HeaderIconStyle>
                  <AiTwotoneHeart />
                </HeaderIconStyle>
              </Link>
            </li>
            <li>
              <HeaderIconStyle
                onClick={() => {
                  handleClickProfile();
                }}
              >
                <BsPerson />
              </HeaderIconStyle>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
