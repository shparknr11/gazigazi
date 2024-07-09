import { Link } from "react-router-dom";
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
              <Link to="/">
                <HeaderIconStyle>
                  <BsPerson />
                </HeaderIconStyle>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
