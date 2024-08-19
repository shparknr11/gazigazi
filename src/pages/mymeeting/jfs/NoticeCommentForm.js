import { Button, Form, Input } from "antd";
// Ant Data
const initialValues = {
  commentBoardSeq: "",
  commentMemberSeq: "",
  commentContents: "",
};
const NoticeCommentForm = ({ postCommentCall }) => {
  const [form] = Form.useForm(); // Form 인스턴스 생성

  // 코멘트 삭제
  const handleClickPost = async item => {
    try {
      await postCommentCall(item.commentContents);
      form.resetFields(["commentContents"]); // 특정 필드 값 초기화
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // 확인 버튼시 최종 입력값
  const onFinished = values => {
    handleClickPost({ ...values });
  };
  return (
    <div>
      <Form
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          margin: "0 auto",
        }}
        form={form}
        initialValues={initialValues}
        onFinish={values => {
          onFinished(values);
        }}
      >
        <Form.Item
          style={{ width: "100%" }}
          name={"commentContents"}
          rules={[{ required: true, message: "내용은 필수 항목입니다." }]}
        >
          {/* <Input placeholder="댓글을 입력하세요." /> */}
          <Input.TextArea
            rows={2}
            style={{ resize: "none" }}
            placeholder="댓글을 입력하세요."
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="small">
            댓글입력
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoticeCommentForm;
