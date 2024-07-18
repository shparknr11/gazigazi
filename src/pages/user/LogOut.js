import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all user-related data from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userSeq");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userPic");
    sessionStorage.removeItem("userGender");
    sessionStorage.removeItem("userBirth");
    sessionStorage.removeItem("userName");

    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const LogOutButton = styled.button`
    background-color: #ebddcc;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    width: 20%;
    font-size: 10pt;
    margin-top: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0b88a;
    }
  `;

  return (
    <div>
      <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
    </div>
  );
};

export default LogOut;
