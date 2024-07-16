import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../userSlice";

const UserDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSeq = useSelector(state => state.user.userSeq);

  const handleDelete = async () => {
    if (!userSeq) {
      alert("유저 정보가 없습니다. 다시 로그인 해주세요.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/user/${userSeq}`,
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

  return (
    <button onClick={handleDelete} className="delete-button">
      회원 탈퇴
    </button>
  );
};

export default UserDelete;
