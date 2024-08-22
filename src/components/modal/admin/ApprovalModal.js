import styled from "@emotion/styled";
import { prColor } from "../../../css/color";
import { MainButton, SubButton } from "../../button/Button";

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
  padding: 25px 40px 10px 40px;
  z-index: 99;
  background-color: ${prColor.p000};
`;

const JoinInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;

  span {
    color: #999;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 5px;
  }
  textarea {
    height: 100%;
    width: 250px;
    padding: 10px;
    border: 1px solid ${prColor.g200};
    border-radius: 13px;
    resize: none;
  }

  .join-btn {
    display: flex;
    justify-content: center;
    gap: 20px;
    button {
      width: 90px;
      margin-top: 20px;
      cursor: pointer;
    }
  }
`;

const ApprovalModal = ({
  modalTitle,
  isOpen,
  onClose,
  onConfirm,
  joinContent,
  setJoinContent,
  labelState,
}) => {
  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();

    if (!joinContent) {
      alert("신청 내용을 입력하세요");
      return;
    }
    onConfirm(joinContent);
    onClose();
  };

  const handleChangeContent = e => {
    // console.log(e.target.value);
    setJoinContent(e.target.value);
  };

  const getLabelName = () => {
    switch (parseInt(labelState)) {
      case 2:
        return "승인";
      case 3:
        return "반려";
      case 4:
        return "삭제";
      default:
        return "승인";
    }
  };
  return (
    <JoinModalStyle>
      <JoinBoxStyle>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <JoinTitle>{modalTitle}</JoinTitle>
          <JoinInputStyle>
            <span>신청 회원의 이메일로 내용이 발송됩니다.</span>
            <textarea
              id="jointext"
              type="text"
              placeholder="승인 안내 내용을 입력하세요"
              autoComplete="off"
              value={joinContent}
              onChange={e => handleChangeContent(e)}
            />
            <div className="join-btn">
              <MainButton label={getLabelName()} type="submit"></MainButton>
              <MainButton label="취소" onClick={() => onClose()}></MainButton>
            </div>
          </JoinInputStyle>
        </form>
      </JoinBoxStyle>
    </JoinModalStyle>
  );
};

export default ApprovalModal;
