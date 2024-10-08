import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { setUser } from '../../slices/userSlice';
import { useDispatch, useSelector } from "react-redux";

const OAuth2Handler = () => {
    const navigate = useNavigate();    
    const dispatch = useDispatch();

    useEffect(() => {

        const myUrl = new URL(window.location.href);
        const token = myUrl.searchParams.get("access_token"); 
        if(token === null) {
            navigate('/login') //access_token이 없을시 로그인 화면 react-routing-url
        }
        const userSeq = myUrl.searchParams.get("user_id"); 
        const userName = myUrl.searchParams.get("nm"); 
        const userPic = myUrl.searchParams.get("pic");      
        const userData = {
            userSeq,
            userPic,
            userEmail: 'test@naver.com',
            userName,
            userPw: '',
            userPwCheck: '',
            userNickname: '유저닉네임',
            userFav: '',
            userBirth: '2024-02-29',
            userPhone: '01012345675',
            userGender: '여자',
            userIntro: '',
            userAddr: '대구 중구 중앙로',
          };
        sessionStorage.setItem("token", token);
        sessionStorage.setItem(
            "userData",
            JSON.stringify({ ...userData })
        );

        dispatch(setUser({ ...userData, token }));

       
        navigate('/'); //로그인 성공시 이동하고 싶은 react-routing-url

      }, []);


    //아래 화면은 찰나라서 보이진 않겠지만 보여주고 싶은 화면 출력
    return (
        <div className="LoginHandeler">
            <div className="notice">
                <p>로그인 중입니다.</p>
                <p>잠시만 기다려주세요.</p>
                <div className="spinner"></div>
            </div>
        </div>
    );
}

export default OAuth2Handler;