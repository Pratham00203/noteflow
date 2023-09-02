import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ description, setDescription }) {
  return (
    <ReactQuill
      theme='snow'
      value={description}
      onChange={setDescription}
      style={{
        height: "300px",
        fontSize: "16px",
        background: "#ffff",
      }}
    />
  );
}
