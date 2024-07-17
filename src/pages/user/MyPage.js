import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, Outlet } from "react-router-dom";
import Loading from "../../components/common/Loading";

const MyPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 120vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
`;

const MyPageWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const MyPageInnerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .mypage-container {
    background: linear-gradient(#ebddcc, #e0b88a, #c5965e);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    height: auto;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 150px;
  margin-bottom: 20px;

  a {
    padding: 10px;
    background-color: #e0b88a;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    margin-bottom: 10px;
    text-align: center;

    &:hover {
      background-color: #c5965e;
    }
  }
`;

const MyPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userSeq = useSelector(state => state.userEmail);

  useEffect(() => {
    const fetchUserData = async () => {
      const userSeq = sessionStorage.getItem("userSeq");
      const token = sessionStorage.getItem("token");

      if (!userSeq || !token) {
        alert("로그인 상태를 확인하세요.");
        navigate("/login");
        return;
      }

      try {
        await axios.get(`http://localhost:3000/api/user/${userSeq}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("유저 정보 가져오기 오류:", error);
        alert("정보를 가져오는 것에 실패했습니다. 다시 로그인해주세요.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userSeq]);

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <MyPageStyle>
      <MyPageWrapStyle>
        <NavLinks>
          <Link to={`/myprofile/:userId/userInfo`}>사용자 정보</Link>
          <Link to={`/myprofile/:userId/myreview`}>사용자 리뷰</Link>
          <Link to={`/myprofile/:userId/infoEdit`}>정보 수정</Link>
          <Link to={`/myprofile/:userId/userDelite`}>회원 탈퇴</Link>
        </NavLinks>
        <MyPageInnerStyle>
          <Outlet />
        </MyPageInnerStyle>
      </MyPageWrapStyle>
    </MyPageStyle>
  );
};

export default MyPage;
