import { useNavigate } from "react-router-dom";
import { getGenderText, getYearLastTwoDigits } from "./homeFunction";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useRef } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const HomeMainPopular = ({ popularList }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const handleClickDetail = _partySeq => {
    // console.log(_partySeq);
    navigate(`/meeting/${_partySeq}`);
  };
  return (
    <div className="mm-meeting-deadline">
      <div className="mm-meeting-title">
        <h1>인기있는, 곧 마감되는 모임🕛</h1>
        {/* <div className="mm-meeting-picks-more">더보기</div> */}
      </div>
      <Swiper
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={20}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        navigation={{
          nextEl: ".recommend-slide-next",
          prevEl: ".recommend-slide-prev",
        }}
        className="mm-meeting-list"
      >
        {popularList.map((item, index) => (
          <SwiperSlide
            key={index}
            className="list-box"
            onClick={() => {
              handleClickDetail(item.partySeq);
            }}
          >
            <div className="list-box-img">
              <img
                src={`/pic/party/${item.partySeq}/${item.partyPic}`}
                alt="모임이미지"
              />
            </div>
            <div className="list-box-content">
              <div className="list-box-title">
                <div className="list-box-profileimg">
                  <img
                    src={`/pic/user/${item.userSeq}/${item.userPic}`}
                    alt="프로필이미지"
                  />
                </div>
                <span style={{ fontWeight: "bold" }}>{item.userName}</span>
                <span style={{ color: "#999" }}> 님의 모임</span>
              </div>
              <h3 className="list-box-text" style={{ fontWeight: "bold" }}>
                {item.partyName}
              </h3>
              <p className="list-box-local" style={{ fontSize: "13px" }}>
                {item.partyLocation1} {item.partyLocation2}
              </p>
              <span className="list-box-gender">
                {getGenderText(item.partyGender)}
              </span>
              <span className="list-box-age">
                {/* {getYearLastTwoDigits(item.partyMinAge) === "1901"
                ? "연령무관"
                : `${getYearLastTwoDigits(item.partyMinAge)} ~`}
              {getYearLastTwoDigits(item.partyMaxAge) === "2155"
                ? ""
                : `${getYearLastTwoDigits(item.partyMaxAge)}년생`} */}
                {getYearLastTwoDigits(item.partyMinAge) === "1901" &&
                getYearLastTwoDigits(item.partyMaxAge) === "2155"
                  ? "연령무관"
                  : `${getYearLastTwoDigits(item.partyMinAge)} ~ ${getYearLastTwoDigits(item.partyMaxAge)}년생`}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="recommend-slide-prev c-slide-prev">
        <MdOutlineArrowBackIos />
      </button>
      <button className="recommend-slide-next c-slide-next">
        <MdOutlineArrowForwardIos />
      </button>
    </div>
  );
};

export default HomeMainPopular;
