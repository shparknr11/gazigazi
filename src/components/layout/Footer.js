import styled from "@emotion/styled";
import gazilogo from "../../images/logo2.png";

const FooterStyle = styled.div`
  background-color: #f9f8f5;

  .footer-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: calc(100% - 30px);
    max-width: 1300px;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 5px;
  }

  .footer-description-div {
    /* display: flex;
    flex-direction: column; */
    margin-bottom: 10px;
  }

  .footer-txt {
    font-weight: 600;
  }

  .gazi-logo-div {
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
        <div className="footer-description-div">
          <div className="footer-description">
            가까운 지역 가까운 지인, 가지가지
          </div>
          <div className="footer-txt">ⓒ gazigazi all rights reserved.</div>
        </div>
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
      </div>
    </FooterStyle>
  );
};

export default Footer;
