import axios from "axios";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();

  useEffect(() => {
    document.title = "Settings";
    getUser();
  }, []);

  const getUser = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "http://localhost:5000/api/auth",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      username.current.value = res.data.user.username;
      email.current.value = res.data.user.email;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async (e) => {
    try {
      e.preventDefault();
      let res = await axios({
        method: "put",
        url: "http://localhost:5000/api/user/update",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: {
          username: username.current.value,
          email: email.current.value,
        },
      });

      toast.success(res.data.msg);
      navigate("/dashboard/notes");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this account?")) {
        let res = await axios({
          method: "delete",
          url: "http://localhost:5000/api/user/delete",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });

        toast.success(res.data.msg);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='user-form'>
      <h1>Update user details</h1>
      <form className='note-user-form d-flex flex-col' onSubmit={updateUser}>
        <label htmlFor='username' className='d-flex flex-col'>
          <p>Username:</p>
          <input type='text' ref={username} name='username' />
        </label>
        <label htmlFor='email' className='d-flex flex-col'>
          <p>Email:</p>
          <input type='email' ref={email} name='email' />
        </label>
        <div className='d-flex' style={{ gap: "15px" }}>
          <input type='submit' value='Update' />
          <button onClick={deleteUser}>Delete your account</button>
        </div>
      </form>
    </section>
  );
}
