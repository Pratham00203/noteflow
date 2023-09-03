import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { toast } from "react-hot-toast";

export default function Note({ noteid }) {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  });
  useEffect(() => {
    getNote();
    document.title = "Note";
  }, []);

  const getNote = async () => {
    try {
      let res = await axios({
        method: "get",
        url: `https://noteflow-backend.onrender.com/api/note/get/note/${noteid}`,
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      setNote({
        title: res.data.note.title,
        description: res.data.note.description,
        createdAt: res.data.note.createdAt,
        updatedAt: res.data.note.updatedAt,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteid) => {
    try {
      if (window.confirm("Are you sure you want to delete this note?")) {
        let res = await axios({
          method: "delete",
          url: `https://noteflow-backend.onrender.com/api/note/delete/${noteid}`,
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });

        toast.success(res.data.msg);
        navigate("/dashboard/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className='note-section'>
      <h1>Note :</h1>
      <div className='note-info'>
        <h1>{note.title}</h1>
        <div className='note-time-info'>
          <p>Created on {moment(note.createdAt).format("llll")}</p>
          {note.updatedAt && (
            <p>Updated on {moment(note.updatedAt).format("llll")}</p>
          )}
        </div>
        <div
          className='note-info-content'
          dangerouslySetInnerHTML={{ __html: note.description }}></div>

        <div className='note-info-cta d-flex' style={{ gap: "10px" }}>
          <Link to={`/dashboard/update/note/${noteid}`}>Edit</Link>
          <button onClick={() => deleteNote(noteid)}>Delete</button>
        </div>
      </div>
    </section>
  );
}
