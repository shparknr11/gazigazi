import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import GuideTitle from "../../components/common/GuideTitle";

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
        await axios.get(`/api/user/${userSeq}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        alert("정보를 가져오는 것에 실패했습니다. 다시 로그인해주세요.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userSeq]);

  // useEffect(() => {
  //   const expectedPath = `/myprofile/${userSeq}/userInfo`;
  //   if (location.pathname !== expectedPath) {
  //     navigate(expectedPath);
  //   }
  // }, [navigate, location.pathname, userSeq]);
  // 마이페이지에 들어가면 기본적으로 사용자 정보를 렌더링시키는 코드
  // 근데 다른 메뉴 눌러도 사용자 정보 하나만 렌더링되는 문제가 있음
  // 지금은 수정될 때까지 사용 불가

  if (loading) {
    return <Loading>로딩 중...</Loading>;
  }

  return (
    <MyPageStyle>
      <GuideTitle guideTitle="마이페이지" />
      <MyPageWrapStyle>
        <NavLinks>
          <Link to={`/myprofile/:userId/userInfo`}>사용자 정보</Link>
          <Link to={`/myprofile/:userId/myreview`}>사용자 리뷰</Link>
          <Link to={`/myprofile/:userId/infoEdit`}>정보 수정</Link>
          <Link to={`/myprofile/:userId/myinterestlist`}>찜 목록</Link>
        </NavLinks>
        <MyPageInnerStyle>
          <Outlet />
        </MyPageInnerStyle>
      </MyPageWrapStyle>
    </MyPageStyle>
  );
};

export default MyPage;
