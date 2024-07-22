import styled from "@emotion/styled";
import img from "../../src/images/notfound.png";
import { prColor } from "../css/color";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const NotFoundWrapStyle = styled.div`
  width: 100%;
  /* maxwidth: */
  margin: 0 auto;
  height: 100%;
  display: flex;
  position: relative;
  .nfw-bg {
    width: 100%;
    height: 800px;
    background: url(${img}) no-repeat center;
    background-size: 100%;
  }
  .nfw-text {
    position: absolute;
    top: 25%;
    left: 38%;
    width: 100%;
    max-width: 410px;
    h1 {
      font-weight: bold;
      font-size: 50px;
      margin-bottom: 25px;
    }
    h2,
    p {
      font-size: 18px;
      margin-bottom: 10px;
      line-height: 1.2;
    }
    .nfw-btn-div {
      display: flex;
      justify-content: end;
      .nfw-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        transform: border 1s ease;
        border: 2px solid ${prColor.p700};
        color: ${prColor.p1000};
        cursor: pointer;
        &:hover {
          border: 2px solid ${prColor.p1000};
        }
      }
    }
  }
`;
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundWrapStyle>
      <div className="nfw-bg">
        <div className="nfw-text">
          <h1>Not Found Page</h1>
          <h2>죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.</h2>
          <p>
            존재하지 않는 주소를 입력하셨거나 요청하신 주소가 변경, 삭제되어
            찾을 수 없습니다.
          </p>
          <div className="nfw-btn-div">
            <div
              className="nfw-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              메인으로 <FaLongArrowAltRight />
            </div>
          </div>
        </div>
      </div>
    </NotFoundWrapStyle>
  );
};

export default NotFoundPage;
