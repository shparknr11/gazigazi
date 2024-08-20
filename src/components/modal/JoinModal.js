import styled from "@emotion/styled";
import { prColor } from "../../css/color";
import { MainButton, SubButton } from "../button/Button";

// react Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/quill.css";
import { modules } from "../../components/modules/quill";

const JoinModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const JoinTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${prColor.black};
`;

const JoinBoxStyle = styled.div`
  border: 1px solid ${prColor.p1000};
  padding: 20px 40px 10px 40px;
  z-index: 99;
  background-color: ${prColor.p000};
`;

const JoinInputStyle = styled.div`
  display: flex;
  flex-direction: column;

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
  .join-quill {
    .ql-editor {
      min-height: 300px !important;
      height: 150px !important;
      caret-color: #000 !important;
      background-color: #fff !important;
    }
    .ql-toolbar {
      visibility: hidden;
    }
  }
`;

const JoinModal = ({
  isOpen,
  onClose,
  onConfirm,
  joinContent,
  setJoinContent,
}) => {
  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();

    if (!joinContent) {
      alert("신청 내용을 입력하세요");
      return;
    }
    onConfirm(joinContent);
  };

  const handleChangeContent = e => {
    // console.log(e.target.value);
    setJoinContent(e.target.value);
  };
  return (
    <JoinModalStyle>
      <JoinBoxStyle>
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <JoinTitle>모임신청</JoinTitle>
          <JoinInputStyle>
            {/* <textarea
              id="jointext"
              type="text"
              placeholder="신청 내용을 입력하세요"
              autoComplete="off"
              value={joinContent}
              onChange={e => handleChangeContent(e)}
            /> */}
            <ReactQuill
              className="join-quill"
              onChange={setJoinContent}
              modules={modules}
            />

            <div className="join-btn">
              <MainButton label="신청" type="submit"></MainButton>
              <MainButton label="취소" onClick={() => onClose()}></MainButton>
            </div>
          </JoinInputStyle>
        </form>
      </JoinBoxStyle>
    </JoinModalStyle>
  );
};

export default JoinModal;
