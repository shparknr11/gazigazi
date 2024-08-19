import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, List, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NoticeCommentList = ({
  commentList,
  deleteCommentCall,
  patchCommentCall,
}) => {
  // 수정 모드 상태 관리
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // 코멘트 수정
  const handleClickPatch = async (item, index) => {
    if (editingIndex === index) {
      // 수정된 코멘트를 서버에 저장하고, 저장 성공 시 UI 업데이트
      await patchCommentCall(item, editText);

      // commentList의 해당 아이템을 수정된 내용으로 즉시 업데이트
      const updatedDataList = dataList.map((comment, i) =>
        i === index ? { ...comment, commentContents: editText } : comment,
      );

      setDataList(updatedDataList);
      setEditingIndex(null);
      setEditText("");
    } else {
      // 수정 모드로 전환
      setEditingIndex(index);
      setEditText(item.commentContents);
    }
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  // 코멘트 삭제
  const handleClickDelete = item => {
    const data = {
      commentSeq: item.commentSeq,
      commentMemberSeq: item.commentMemberSeq,
    };
    deleteCommentCall(data);
  };

  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    setDataList([...commentList]);
  }, [commentList]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={dataList}
      renderItem={(item, index) => (
        <List.Item>
          <Flex style={{ width: "100%" }} justify={"space-between"} gap={10}>
            <div>
              <p>
                <IconText
                  icon={UserOutlined}
                  text=""
                  key="list-vertical-message"
                />
                {item.userName}
              </p>
            </div>
            <div style={{ textAlign: "left", width: "68%" }}>
              {editingIndex === index ? (
                // 수정 모드: Input 컴포넌트로 변경
                <>
                  <Input.TextArea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    rows={2}
                    style={{ resize: "none" }} // 사이즈 조절 불가능하게 설정
                  />
                  <p style={{ color: "#979797" }}>
                    {moment(item?.inputDt).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </>
              ) : (
                // 일반 모드: 코멘트 내용 표시
                <>
                  <p style={{ marginBottom: 10 }}>{item.commentContents}</p>
                  <p style={{ color: "#979797" }}>
                    {moment(item?.inputDt).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </>
              )}
            </div>
            <div>
              {editingIndex === index ? (
                <>
                  <Button
                    type="link"
                    onClick={() => handleClickPatch(item, index)}
                  >
                    <IconText icon={CheckOutlined} text="" key="save-button" />
                  </Button>
                  <Button type="link" onClick={handleCancelEdit}>
                    <IconText
                      icon={CloseOutlined}
                      text=""
                      key="cancel-button"
                    />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="link"
                    onClick={() => handleClickPatch(item, index)}
                  >
                    <IconText icon={EditOutlined} text="" key="edit-button" />
                  </Button>
                  <Button type="link" onClick={() => handleClickDelete(item)}>
                    <IconText
                      icon={DeleteOutlined}
                      text=""
                      key="delete-button"
                    />
                  </Button>
                </>
              )}
            </div>
          </Flex>
        </List.Item>
      )}
    />
  );
};

export default NoticeCommentList;
