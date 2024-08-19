import styled from "@emotion/styled";
import { prColor } from "../../css/color";
import { MainButton, SubButton } from "../button/Button";
import DOMPurify from "dompurify";
import { IoIosCloseCircleOutline } from "react-icons/io";

const JoinModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const JoinTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${prColor.black};
`;

const JoinBoxStyle = styled.div`
  border: 1px solid ${prColor.p1000};
  padding: 25px 40px 25px 40px;
  z-index: 99;
  background-color: ${prColor.p000};
`;

const JoinInputStyle = styled.div`
  display: flex;
  flex-direction: column;

  .join-form-div {
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 13px;
    margin-bottom: 15px;
    height: 200px;
    overflow-y: auto;
    /* resize: none; */
  }

  .join-btn {
    display: flex;
    justify-content: center;
    gap: 20px;
    .join-btn-close {
      top: 15px;
      right: 15px;
      position: absolute;
      cursor: pointer;
      svg {
        width: 29px;
        height: 29px;
        &:hover {
          color: #999;
        }
      }
    }
  }
`;

const ApplicationModal = ({ modalOpen, setModalOpen, applicationText }) => {
  if (!modalOpen) return null;

  return (
    <JoinModalStyle>
      <JoinBoxStyle>
        <form>
          <JoinTitle>모임신청 가입양식</JoinTitle>
          <JoinInputStyle>
            {/* <textarea
              id="jointext"
              type="text"
              placeholder="신청 내용을 입력하세요"
              autoComplete="off"
            /> */}
            <div
              className="join-form-div"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(applicationText),
              }}
            />
            <div className="join-btn">
              <div
                className="join-btn-close"
                onClick={() => setModalOpen(false)}
              >
                <IoIosCloseCircleOutline />
              </div>
            </div>
          </JoinInputStyle>
        </form>
      </JoinBoxStyle>
    </JoinModalStyle>
  );
};

export default ApplicationModal;
