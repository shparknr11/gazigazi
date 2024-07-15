import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userSeq");
    localStorage.removeItem("userEmail"); // Add any other items if needed

    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>로그아웃</button>
      {showConfirm && (
        <div>
          <p>로그아웃 하시겠습니까?</p>
          <button onClick={handleLogout}>확인</button>
          <button onClick={handleCancel}>취소</button>
        </div>
      )}
      <div>로그인 페이지</div>
    </div>
  );
};

export default LogOut;
