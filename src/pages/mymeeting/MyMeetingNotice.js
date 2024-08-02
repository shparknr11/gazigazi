import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteNotice,
  getNoticeOne,
  patchNotice,
} from "../../apis/mymeetingapi/meetingnotice/meetingnotice";
import Loading from "../../components/common/Loading";
import { toast } from "react-toastify";
import moment from "moment";
const MyMeetingNoticeStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .notice-wrap {
    width: 100%;
    margin-bottom: 75px;
    height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1024px;
    gap: 40px;
  }
  .notice-inner {
    width: 100%;
  }
  .notice-form-area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    max-width: 900px;
    border: 1px solid gray;
    border-radius: 4px;
    box-shadow: 1px 1px 1px 1px gray;
  }
  .meeting-introduce {
    margin-top: 30px;
    display: flex;
    width: 100%;
    height: 205px;
    justify-content: center;
    align-items: center;
    gap: 63px;
  }
  /* 임시 */
  form {
    width: 90%;
  }
  .button-wrap {
    display: flex;
    justify-content: right;
    width: 100%;
    padding: 10px;
    gap: 20px;
  }
  .flex-column {
    width: 100%;
    text-align: left;
    padding: 20px 0;
  }
  .noitce-form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .notice-textarea {
    resize: none;
    padding: 10px;
    line-height: 2;
    width: 100%;
  }
`;
const TitleDivStyle = styled.div`
  width: 100%;
  display: block;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-left: 5px;
  padding-top: 20px;
`;
const MyMeetingNotice = () => {
  // jfs 수정 상태
  const [isEdit, setIsEdit] = useState(false);

  const [imgUrl, setImgUrl] = useState(null);
  const [textAreaVal, setTextAreaVal] = useState("");
  const [textAreaLength, setTextAreaLength] = useState(0);
  const [dataOrigin, setDataOrigin] = useState({});
  const [data, setData] = useState({});
  const [boardTitle, setBoardTitle] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [previewPreImg, setPreviewPreImg] = useState();
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();
  //console.log(location);
  const getData = async () => {
    setIsLoading(true);
    try {
      let res = await getNoticeOne(
        param.meetingnoticeId,
        location.state.boardPartySeq,
        location.state.boardMemberSeq,
      );

      // jfs 진행해야 해요.
      res = {
        boardSeq: 24,
        boardPartySeq: 11,
        boardMemberSeq: 41,
        userName: "이재문",
        boardTitle: "요즘 무라카미하루키 책 읽는데 재밌네요",
        boardContents: "간만에 재밌게 읽었어요",
        boardHit: 11,
        inputDt: "2024-07-29T14:56:47",
        updateDt: "2024-07-29T16:42:23",
        pics: ["c4215e8a-901d-46da-8e64-6db1e939be39.jpg"],
      };

      setData(res);
      setDataOrigin(res);
      // 수정 항목
      setBoardTitle(res.boardTitle);
      setTextAreaVal(res.boardContents);
      // console.log("여기니?");
      // console.log(res);
      console.log(res?.pics.length);
      console.log(`/pic/board/41/${res?.pics[0]}`);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    // console.log(data);
  }, []);
  const handleFileChange = e => {
    // file 이라서 e.target.value 를 활용하지 않는다.
    // e.taret.files 는 배열이다.
    // e.target.files = [];

    const tempFile = e?.target.files[0];
    // 사용자가 이미지를 선택하면
    // 웹브라우저는 이미지를 캐시에 보관함.
    // 임시 공간에 저장한 이미지를 우리는 경로를 알아내야 한다.
    // 그때 웹브라우저 상의 임시 URL 을 알아내는 기능 제공한다.
    console.log(tempFile);
    if (tempFile) {
      const tempUrl = URL?.createObjectURL(tempFile);

      setPreviewPreImg(tempUrl);

      // 전송할 파일 변경(주의합니다. 파일을 넣어주세요.)
      setImgFile(tempFile);
    }
  };

  const handleEditClick = async () => {
    setIsEdit(true);
  };

  const handleDeleteClick = async () => {
    try {
      const objData = {
        boardPartySeq: Number(param.meetingnoticeId),
        boardSeq: location.state.boardPartySeq,
        boardMemberSeq: location.state.boardMemberSeq,
      };
      console.log(objData);
      // const a = 1;
      // if (a === 1) return;
      await deleteNotice(objData);
    } catch (error) {
      console.log(error);
    }
    toast.success("게시글이 삭제되었습니다.");
    navigate(`/mymeeting/mymeetingLeader/${location.state.boardPartySeq}`);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <MyMeetingNoticeStyle>
        {isEdit ? (
          <div className="notice-wrap">
            <TitleDivStyle>모임 게시판</TitleDivStyle>
            <div className="notice-inner">
              <div className="notice-form-area">
                <form>
                  {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
                  <div className="meeting-introduce">
                    <div
                      style={{
                        width: "50%",
                        height: "250px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* data?.pics.length > 0 */}
                      <label htmlFor="fileId">
                        {previewPreImg ? (
                          // 나중에 pics 로 조건 쳐야함.
                          <img
                            style={{
                              cursor: "pointer",
                              width: "200px",
                              height: "200px",
                            }}
                            src={previewPreImg}
                          />
                        ) : (
                          <CiImageOff
                            style={{ cursor: "pointer", textAlign: "center" }}
                            className="caption-img"
                            size="200"
                          />
                        )}
                        <input
                          style={{ width: "0", height: "0" }}
                          type="file"
                          id="fileId"
                          onChange={e => {
                            handleFileChange(e);
                          }}
                        ></input>
                      </label>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "30px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            textAlign: "left",
                          }}
                        >
                          <label htmlFor="mettingname" style={{ width: "25%" }}>
                            제목
                          </label>
                          <input
                            id="mettingname"
                            value={boardTitle}
                            onChange={e => {
                              setBoardTitle(e.target.value);
                            }}
                            style={{ width: "73%" }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            textAlign: "left",
                          }}
                        >
                          <label htmlFor="mettingname" style={{ width: "25%" }}>
                            작성자
                          </label>
                          <input
                            id="mettingname"
                            value={data?.userName}
                            style={{ width: "73%", border: "none" }}
                            readOnly
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textAlign: "left",
                          }}
                        >
                          <label htmlFor="mettingdata" style={{ width: "25%" }}>
                            모임날짜
                          </label>
                          <input
                            id="mettingdata"
                            value={moment(data?.inputDt).format(
                              "YYYY-MM-DD HH:mm:ss",
                            )}
                            style={{ width: "73%", border: "none" }}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="noitce-form-container">
                    <div className="flex-column">
                      <label
                        htmlFor="noticecontent"
                        style={{ paddingBottom: "30px", display: "block" }}
                      >
                        내용
                      </label>
                      <textarea
                        id="noticecontent"
                        className="notice-textarea"
                        rows="10"
                        value={textAreaVal}
                        maxLength={300}
                        onChange={e => {
                          setTextAreaVal(e.target.value);
                          setTextAreaLength(e.target.value.length);
                        }}
                      ></textarea>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "none" }}>
                          <strong style={{ color: "red" }}>*</strong>
                          제한 숫자{textAreaLength}/300
                        </span>
                      </div>
                    </div>
                    <div className="button-wrap">
                      <button
                        type="button"
                        className="etc-btn"
                        onClick={() => {
                          setIsEdit(false);
                        }}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="resister-btn"
                        onClick={() => {
                          //setIsEdit(false);
                          console.log("새로운 수정으로 변경 전달");
                        }}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                          handleDeleteClick();
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="notice-wrap">
            <TitleDivStyle>모임 게시판</TitleDivStyle>
            <div className="notice-inner">
              <div className="notice-form-area">
                <form>
                  {/* <!-- 굳이 해당 모임 타고 들어왔는데 보여줄 필요가 있나 싶어서 뺌 --> */}
                  <div className="meeting-introduce">
                    <div
                      style={{
                        width: "50%",
                        height: "250px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* data?.pics.length > 0 */}
                      <label htmlFor="fileId">
                        {previewPreImg ? (
                          // 나중에 pics 로 조건 쳐야함.
                          <img
                            style={{
                              // cursor: "pointer",
                              width: "200px",
                              height: "200px",
                            }}
                            src={previewPreImg}
                          />
                        ) : (
                          <CiImageOff
                            style={{ textAlign: "center" }}
                            className="caption-img"
                            size="200"
                          />
                        )}
                      </label>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "30px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            textAlign: "left",
                          }}
                        >
                          <label htmlFor="mettingname" style={{ width: "25%" }}>
                            제목
                          </label>
                          <input
                            id="mettingname"
                            value={dataOrigin?.boardTitle}
                            style={{ width: "73%", border: 0 }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            textAlign: "left",
                          }}
                        >
                          <label htmlFor="mettingname" style={{ width: "25%" }}>
                            작성자
                          </label>
                          <input
                            id="mettingname"
                            value={dataOrigin?.userName}
                            style={{ width: "73%", border: 0 }}
                            readOnly
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textAlign: "left",
                          }}
                        >
                          <label htmlFor="mettingdata" style={{ width: "25%" }}>
                            모임날짜
                          </label>
                          <input
                            id="mettingdata"
                            value={moment(dataOrigin?.inputDt).format(
                              "YYYY-MM-DD HH:mm:ss",
                            )}
                            style={{ width: "73%", border: 0 }}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="noitce-form-container">
                    <div className="flex-column">
                      <label
                        htmlFor="noticecontent"
                        style={{ paddingBottom: "30px", display: "block" }}
                      >
                        내용
                      </label>
                      <textarea
                        id="noticecontent"
                        className="notice-textarea"
                        style={{ border: 0 }}
                        rows="10"
                        value={dataOrigin?.boardContents}
                        maxLength={300}
                      ></textarea>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "none" }}>
                          <strong style={{ color: "red" }}>*</strong>
                          제한 숫자{textAreaLength}/300
                        </span>
                      </div>
                    </div>
                    <div className="button-wrap">
                      <button
                        type="button"
                        className="resister-btn"
                        onClick={() => {
                          // toast.warning("3차때 수정 구현 예정입니다.");
                          handleEditClick();
                        }}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => {
                          handleDeleteClick();
                        }}
                      >
                        삭제
                      </button>

                      <button
                        type="button"
                        className="etc-btn"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        목록
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </MyMeetingNoticeStyle>
    </>
  );
};

export default MyMeetingNotice;
