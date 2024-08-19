import React, { useState } from "react";

import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "../../../css/quill.css";
const NoticeEditor = () => {
  const [textAreaVal, setTextAreaVal] = useState("");
  // 모듈 활용
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],

        ["clean"],
      ],
    },
  };
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      dfsdfsdfsdfsd
      <ReactQuill
        onChange={setTextAreaVal}
        value={textAreaVal}
        modules={modules}
      />
    </div>
  );
};

export default NoticeEditor;
