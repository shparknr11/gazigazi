import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { clearUser } from "../../redux/UserRedux/Actions/userActions";
import { clearUser } from "../../slices/userSlice";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());

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
    font-size: 12pt;
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
