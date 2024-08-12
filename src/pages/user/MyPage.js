import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import GuideTitle from "../../components/common/GuideTitle";
import { clearUser } from "../../slices/userSlice";

const MyPageStyle = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 120vh;
  margin: 0 auto;
  margin-top: 40px;
`;

const MyPageWrapStyle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const MyPageInnerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  .mypage-container {
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
  const [isLoggingOut, setIsLoggingOut] = useState(false); // 로그아웃 상태 관리
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSeq = useSelector(state => state.user.userSeq);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggingOut) return; // 로그아웃 상태면 데이터 요청 종료

      try {
        if (isTokenExpired(token)) {
          handleLogout();
          return;
        }

        await axios.get(`/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 데이터 가져오기 성공, 로딩을 종료
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          console.error(error);
          alert("정보를 가져오는 데 실패했습니다. 다시 로그인해주세요.");
        }
      }
    };

    const isTokenExpired = token => {
      if (!token) return true; // 토큰이 없으면 만료된 것으로 간주
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(atob(base64));

      const currentTime = Date.now() / 1000;
      return jsonPayload.exp < currentTime;
    };

    const handleLogout = () => {
      if (isLoggingOut) return; // 이미 로그아웃 중이면 함수 종료

      setIsLoggingOut(true); // 로그아웃 진행 중으로 설정

      dispatch(clearUser());
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("token");
      navigate("/login");
    };

    fetchUserData();

    const currentPath = window.location.pathname;
    if (!currentPath.includes(`/myprofile/${userSeq}`)) {
      window.history.replaceState(null, "", `/myprofile/${userSeq}/userInfo`);
    }

    // Cleanup function
    return () => {
      setIsLoggingOut(false); // 컴포넌트 언마운트 시 플래그 리셋
    };
  }, [userSeq, token, navigate, dispatch, isLoggingOut]);

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <MyPageStyle>
      <GuideTitle guideTitle="마이페이지" />
      <MyPageWrapStyle>
        <NavLinks>
          <Link to={`/myprofile/${userSeq}/userInfo`}>내 정보</Link>
          <Link to={`/myprofile/${userSeq}/infoEdit`}>정보 수정</Link>
          <Link to={`/myprofile/${userSeq}/myreview`}>내가 작성한 리뷰</Link>
          <Link to={`/myprofile/${userSeq}/myinterestlist`}>찜 목록</Link>
        </NavLinks>
        <MyPageInnerStyle>
          <Outlet />
        </MyPageInnerStyle>
      </MyPageWrapStyle>
    </MyPageStyle>
  );
};

export default MyPage;
