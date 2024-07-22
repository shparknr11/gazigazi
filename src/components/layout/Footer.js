import styled from "@emotion/styled";
import gazilogo from "../../images/logo2.png";
import { prColor } from "../../css/color";

const FooterStyle = styled.div`
  background-color: ${prColor.p100};
  border-top: 1px solid ${prColor.p300};

  .footer-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: calc(100% - 30px);
    max-width: 1300px;
    margin: 0 auto;
    padding-bottom: 5px;
    padding-top: 40px;
  }
  /* .footer-menu-list {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
    margin-left: 40px;
  } */
  .footer-description-div {
    /* display: flex;
    flex-direction: column; */
    margin-bottom: 10px;
  }
  .gazi-logo-div {
    margin-bottom: 15px;
  }

  .gazi-logo {
    display: block;
    width: 100px;
    height: 50px;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-inner">
        <div className="gazi-logo-div">
          <div
            className="gazi-logo"
            style={{
              backgroundImage: `url(${gazilogo})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </div>
        <div className="footer-description-div">
          <div className="footer-description">
            가까운 지역 가까운 지인, 가지가지
          </div>
          <div className="footer-txt">ⓒ gazigazi all rights reserved.</div>
        </div>
      </div>
    </FooterStyle>
  );
};

export default Footer;
