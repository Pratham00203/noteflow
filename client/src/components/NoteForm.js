import { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NoteForm({ option, noteid }) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${option} Note`;
    option === "Update" && getNote();
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

      setTitle(res.data.note.title);
      setDescription(res.data.note.description);
    } catch (error) {
      console.log(error);
    }
  };
  const createNote = async (e) => {
    try {
      e.preventDefault();
      if (title.trim() !== "" && description.trim() !== "") {
        let res = await axios({
          method: "post",
          url: `https://noteflow-backend.onrender.com/api/note/create`,
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
          data: {
            title: title,
            description: description,
          },
        });

        toast.success(res.data.msg);
        navigate("/dashboard/notes");
      } else {
        toast.error("Note cannot be empty!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateNote = async (e) => {
    try {
      e.preventDefault();
      if (title.trim() !== "" && description.trim() !== "") {
        let res = await axios({
          method: "put",
          url: `https://noteflow-backend.onrender.com/api/note/update/${noteid}`,
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
          data: {
            title: title,
            description: description,
          },
        });
        toast.success(res.data.msg);
        navigate("/dashboard/notes");
      } else {
        toast.error("Note cannot be empty!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='note-form'>
      <h1>{option} Note</h1>
      <form
        className='note-user-form d-flex flex-col'
        onSubmit={option === "Create" ? createNote : updateNote}>
        <label htmlFor='title' className='d-flex flex-col'>
          <p>Title:</p>
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>Summarize Your Note in a Few Words.</span>
        </label>
        <label htmlFor='description' className='d-flex flex-col'>
          <p>Description:</p>
          <TextEditor
            setDescription={setDescription}
            description={description}
          />
          <span>
            Describe the purpose or context of your note here. Feel free to use
            line breaks or bullet points for better readability.
          </span>
        </label>

        <input type='submit' value={option} />
      </form>
    </section>
  );
}
