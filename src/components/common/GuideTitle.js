import { TiHome } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const CategoryMainTitle = styled.div`
  width: 100%;
  .guidetitle-style {
    display: flex;
    align-content: center;
  }
  h1 {
    font-size: 25px;
    margin-top: 25px;
    margin-bottom: 60px;
    font-weight: bold;
  }
`;

const GuideTitle = ({ title, guideTitle, subTitle }) => {
  const navigate = useNavigate();
  return (
    <CategoryMainTitle>
      <span className="guidetitle-style">
        <TiHome
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/`);
          }}
        />
        <IoIosArrowForward />
        <span>{guideTitle}</span>
      </span>
      <h1>
        {title}
        {subTitle}
      </h1>
    </CategoryMainTitle>
  );
};

export default GuideTitle;
