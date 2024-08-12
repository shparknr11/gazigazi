import styled from "@emotion/styled";
import { prColor } from "../../css/color";

const ButtonStyle = styled.button`
  cursor: pointer;
  font-family: "Pretendard Variable";
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 30px;
  height: 2.4em;
  transition:
    border 0.3s,
    background-color 0.3s,
    color 0.3s;
  border: 1px solid;
  background-color: ${props => props.bg};
  color: ${props => props.color};

  &:hover {
    border: 1px solid ${props => props.hoverBorder};
    background-color: ${props => props.hoverBg};
    color: ${props => props.hoverColor};
  }
`;
const MainButtonStyle = styled(ButtonStyle)`
  background-color: ${prColor.p800};
  color: ${prColor.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${prColor.p800};
  &:hover {
    border: 1px solid ${prColor.p1000};
    background-color: ${prColor.p1000};
  }
`;

const SubButtonStyle = styled(ButtonStyle)`
  border: 1px solid ${prColor.p100};
  background-color: ${prColor.g800};
  color: ${prColor.g100};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid ${prColor.black};
    background-color: ${prColor.p000};
    color: ${prColor.black};
  }
`;

const ActionButtonStyle = styled(ButtonStyle)`
  background-color: ${prColor.white};
  color: ${prColor.p700};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${prColor.pr02};
    color: ${prColor.white};
  }
`;

const DelectButtonStyle = styled(ButtonStyle)`
  background-color: ${prColor.error};
  color: ${prColor.white};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid #ca2929;
    background-color: #ca2929;
    color: ${prColor.white};
  }
`;
const DelButtonStyle = styled(ButtonStyle)`
  background-color: #ca2929;
  color: ${prColor.white};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid #ca2929;
    background-color: #ca2929;
    color: ${prColor.white};
  }
`;

const ReturnButtonStyle = styled(ButtonStyle)`
  background-color: ${prColor.p500};
  color: ${prColor.white};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${prColor.p500};

  &:hover {
    border: 1px solid ${prColor.p1000};
    background-color: ${prColor.p1000};
  }
`;

const MainButton = ({ label = "버튼", onClick }) => {
  return <MainButtonStyle onClick={onClick}>{label}</MainButtonStyle>;
};
const SubButton = ({ label = "버튼", onClick }) => {
  return <SubButtonStyle onClick={onClick}>{label}</SubButtonStyle>;
};

const ActionButton = ({ label = "버튼", onClick }) => {
  return <ActionButtonStyle onClick={onClick}>{label}</ActionButtonStyle>;
};

const DelectButton = ({ label = "버튼", onClick }) => {
  return <DelectButtonStyle onClick={onClick}>{label}</DelectButtonStyle>;
};
const DelButton = ({ label = "버튼", onClick }) => {
  return <DelButtonStyle onClick={onClick}>{label}</DelButtonStyle>;
};
const ReturnButton = ({ label = "버튼", onClick }) => {
  return <ReturnButtonStyle onClick={onClick}>{label}</ReturnButtonStyle>;
};

export {
  MainButton,
  SubButton,
  ActionButton,
  DelectButton,
  DelButton,
  ReturnButton,
};
