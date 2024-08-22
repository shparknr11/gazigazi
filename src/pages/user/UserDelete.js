import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { clearUser } from "../../redux/UserRedux/Actions/userActions";
import { clearUser } from "../../slices/userSlice";
import { useState } from "react";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: -35px;
`;

const DeleteButton = styled.button`
  background-color: #e6e2d5;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 20%;
  font-size: 12pt;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dcd8c5;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
`;

const Modalbutton1 = styled.button`
  background-color: #d3cdb5;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 35%;
  font-size: 10pt;
  text-align: center;
  transition: background-color 0.3s;
  margin: auto;
  margin-top: 15px;
  margin-left: 20px;

  &:hover {
    background-color: #dcd8c5;
  }
`;

const Modalbutton2 = styled.button`
  background-color: #d3cdb5;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 35%;
  font-size: 10pt;
  text-align: center;
  transition: background-color 0.3s;
  margin: 10px;
  margin-top: 15px;
  margin-left: 65px;

  &:hover {
    background-color: #dcd8c5;
  }
`;

const UserDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSeq = useSelector(state => state.user.userSeq);
  const token = useSelector(state => state.user.token);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleDelete = () => {
    if (!userSeq) {
      alert("유저 정보가 없습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  const deleteAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
        return;
      }
      const response = await axios.patch(
        `/api/user`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.code === 1) {
        dispatch(clearUser());
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("token");
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/login");
      } else {
        alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleConfirmDelete = () => {
    deleteAccount();
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <ButtonContainer>
        <DeleteButton onClick={handleDelete} className="delete-button">
          회원 탈퇴
        </DeleteButton>
      </ButtonContainer>
      {showModal && (
        <Modal>
          <ModalContent className="modal-content">
            <label>현재 비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="현재 비밀번호 입력"
            />
            <label>비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <Modalbutton1
              className="modal-button-1"
              onClick={handleConfirmDelete}
            >
              확인
            </Modalbutton1>
            <Modalbutton2
              className="modal-button-2"
              onClick={handleCancelDelete}
            >
              취소
            </Modalbutton2>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default UserDelete;
