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
  const userSeq = useSelector(state => state.user.userSeq);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userSeq || !token) {
        alert("로그인 상태를 확인하세요.");
        navigate("/login");
        return;
      }

      try {
        await axios.get(`/api/user/${userSeq}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (window.location.pathname === `/myprofile/${userSeq}`) {
          navigate(`/myprofile/${userSeq}/userInfo`);
        }
      } catch (error) {
        alert("정보를 가져오는 것에 실패했습니다. 다시 로그인해주세요.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userSeq, token]);

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
