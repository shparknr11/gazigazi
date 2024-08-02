import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperInit from "swiper";
import "swiper/css";
import { Link } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import styled from "@emotion/styled";

export const CartegoryWrapStyle = styled.div`
  .categoryslide {
    display: flex;
    width: 100%;
    max-width: 1062px;
    margin: 0 auto;
  }
  .swiper-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    gap: 40px;
    margin-bottom: 120px;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px !important;
  }
  .category-item {
    display: flex;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 55px;
    background-color: #efede5;
    border: 2px solid white;
    cursor: pointer;
    transition: border 1s ease;
    &:hover {
      border: 2px solid #d3cdb5;
    }
  }
  svg {
    width: 32px;
    height: 32px;
    /* 색상 변경 예정 */
  }
  p {
    font-size: 12px;
  }
  @media all and (max-width: 1072px) {
    .categoryslide {
      width: 100%;
      max-width: 100%;
    }
    .swiper-wrapper {
    }
  }
`;

const Category = () => {
  const categorySlide = useRef(null);

  // swiper 옵션
  const swiperOption = {
    loop: true,
    slidesPerView: 7,
    onInit: swiper => {
      categorySlide.current = swiper;
    },
  };

  const makeCardSlide = () => {
    const wWidth = window.innerWidth;
    if (wWidth > 1062) {
      // swiper 를 제거
      if (categorySlide.current) {
        // swiper 를 제거하는 코드
        categorySlide.current.destroy();
        // useState 는 함수가 종료되어야 화면에 반영된다.
        // setCardSlide(null);
      }
    } else {
      // swiper 를 생성한다.
      // swiper 작동시키기(모바일에서만 작동해야함)
      // 리액트 swiper 에는 destroyed 속성이 있어요.
      if (categorySlide.current?.destroyed) {
        // swiper를 실시간 만들기
        categorySlide.current = new SwiperInit(".categoryslide", swiperOption);
      }
    }
  };

  // 화면의 리사이즈에 따른 슬라이드 변경 코드
  // cardSlide 상태가 바뀜을 체크한다.
  useEffect(() => {
    window.addEventListener("resize", makeCardSlide);
    return () => {
      window.removeEventListener("resize", makeCardSlide);
    };
  }, [categorySlide]);

  useEffect(() => {
    makeCardSlide();
  }, []);
  return (
    <CartegoryWrapStyle>
      <Swiper className="categoryslide" {...swiperOption}>
        <SwiperSlide>
          <Link to="/category?partyGenre=0">
            <div className="category-item">
              <IoIosList style={{ witdh: "80px", height: "80px" }} />
            </div>
            <div className="mt-category-text">전체보기</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=1">
            <div className="mt-category-div">
              <div className="mt-category-img"></div>
              <div className="mt-category-text">스포츠</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=2">
            <div className="mt-category-div">
              <div className="mt-category-imgone"></div>
              <div className="mt-category-text">게임</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=3">
            <div className="mt-category-div">
              <div className="mt-category-imgtwo"></div>
              <div className="mt-category-text">맛집</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=4">
            <div className="mt-category-div">
              <div className="mt-category-imgthree"></div>
              <div className="mt-category-text">패션</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=5">
            <div className="mt-category-div">
              <div className="mt-category-imgfour"></div>
              <div className="mt-category-text">자기개발</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=6">
            <div className="mt-category-div">
              <div className="mt-category-imgfive"></div>
              <div className="mt-category-text">문화•예술</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=7">
            <div className="mt-category-div">
              <div className="mt-category-imgsix"></div>
              <div className="mt-category-text">Bar</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/category?partyGenre=8">
            <div className="mt-category-div">
              <div className="mt-category-imgseven"></div>
              <div className="mt-category-text">기타</div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </CartegoryWrapStyle>
  );
};

export default Category;
