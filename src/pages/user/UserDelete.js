import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../userSlice";
import { useState } from "react";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: -35px;
`;

const DeleteButton = styled.button`
  background-color: #ebddcc;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 10pt;
  transition: background-color 0.3s;
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

const Modalbutton1 = styled.div`
  background-color: #ebddcc;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 50%;
  font-size: 10pt;
  text-align: center;
  transition: background-color 0.3s;
  margin: auto;
  margin-top: 15px;

  &:hover {
    background-color: #c5965e;
  }
`;

const Modalbutton2 = styled.div`
  background-color: #ebddcc;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 50%;
  font-size: 10pt;
  text-align: center;
  transition: background-color 0.3s;
  margin: auto;
  margin-top: 15px;

  &:hover {
    background-color: #c5965e;
  }
`;

const UserDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSeq = useSelector(state => state.user.userSeq);
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

      // 회원 탈퇴 요청
      const response = await axios.patch(
        `http://localhost:3000/api/user/${userSeq}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      console.log("회원 탈퇴 요청 결과:", response.data);

      if (response.data.code === 1) {
        dispatch(deleteUserAccount());
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userSeq");
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } else {
        alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원 탈퇴 오류:", error);
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
