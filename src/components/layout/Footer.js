import styled from "@emotion/styled";
import gazilogo from "../../images/logo2.png";
import { prColor } from "../../css/color";
import { Link } from "react-router-dom";

const FooterStyle = styled.div`
  background-color: ${prColor.p500};
  border-top: 1px solid ${prColor.p600};

  .footer-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: calc(100% - 30px);
    max-width: 1300px;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 10px;
  }

  .gazi-logo-div {
  }

  .gazi-logo {
    display: block;
    width: 100px;
    height: 50px;
    background-image: url(${gazilogo});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .footer-description-div {
    margin-bottom: 10px;
    margin-left: 40px;
    margin-top: 40px;
    font-size: 12px;
  }
  .additional-info-div {
    display: flex;
    gap: 100px;
  }
  .additional-info {
    font-size: 12px;
    margin-top: 40px;
    color: #000;

    .info-item {
      margin-bottom: 5px;
    }
  }

  .footer-links-div {
    .footer-links {
      margin-top: 10px;
      display: flex;
      gap: 10px;
    }

    a {
      color: #000;
      font-size: 12px;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-inner">
        <div className="gazi-logo-div">
          <div className="gazi-logo" />
        </div>
        {/* <div className="footer-description-div">
          <div className="footer-description">
            가까운 지역 가까운 지인, 가지가지
          </div>
          <div className="footer-txt">ⓒ gazigazi all rights reserved.</div>
        </div> */}
        <div className="additional-info-div">
          <div className="additional-info">
            <div className="info-item">
              대표: | 사업자 등록번호: 123-45-67890
            </div>
            <div className="info-item">주소: 대구광역시 중구 109-2</div>
            <div className="info-item">
              문의: clear122@gazigazi.com | 전화: 02-1234-5678
            </div>
          </div>

          <div className="footer-links-div">
            <div className="footer-links">
              <Link>이용 약관</Link>
              <Link>개인정보 처리방침</Link>
              <Link>문의하기</Link>
            </div>
            <div className="footer-description-div">
              <div className="footer-description">
                가까운 지역 가까운 지인, 가지가지
              </div>
              <div className="footer-txt">ⓒ gazigazi all rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;
