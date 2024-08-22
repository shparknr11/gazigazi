import styled from "@emotion/styled";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../slices/userSlice";

const LogOutButton = styled.button`
  background-color: #e6e2d5;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 20%;
  font-size: 12pt;
  margin-top: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dcd8c5;
  }
`;

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async e => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.delete("/api/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code === 1) {
        console.log(response.data);
      }
    } catch (error) {
      // 서버와의 통신 중 오류 처리
      const errorMsg =
        error.response?.data?.resultMsg ||
        "오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMsg);
    }

    dispatch(clearUser());
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <LogOutButton onClick={handleLogout}>로그아웃</LogOutButton>
    </div>
  );
};

export default LogOut;
