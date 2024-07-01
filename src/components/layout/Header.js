const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <a>
            <img src="#" alt="가지가지" className="header-logo-img" />
          </a>
        </div>
        <nav className="header-menu">
          <ul className="header-menu-list">
            <li>
              <a href="#">홈</a>
            </li>
            <li>
              <a href="#">소개</a>
            </li>
            <li>
              <a href="#">커뮤니티 후기</a>
            </li>
            <li>
              <a href="#">내 모임</a>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="header-icon-list">
            <li>
              <a href="#">
                <div>♥</div>
              </a>
            </li>
            <li>
              <a href="#">
                <div>⌂</div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
