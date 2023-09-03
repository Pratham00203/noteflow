import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginRegister({ defaultOption }) {
  const [option, setOption] = useState("Login");
  useEffect(() => {
    document.title = "Login/Register";

    if (defaultOption) {
      if (defaultOption === "Register") {
        setOption("Register");
      } else {
        setOption("Login");
      }
    }

    //eslint-disable-next-line
  }, []);
  const loginEmail = useRef();
  const loginPassword = useRef();
  const registerUsername = useRef();
  const registerEmail = useRef();
  const registerPassword = useRef();

  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      if (
        loginEmail.current.value.trim() !== "" &&
        loginPassword.current.value.trim() !== ""
      ) {
        let res = await axios({
          method: "post",
          url: "https://noteflow-backend.onrender.com/api/auth/login",
          data: {
            email: loginEmail.current.value,
            password: loginPassword.current.value,
          },
        });

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard/notes");
      } else {
        toast.error("All fields are required");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const register = async (e) => {
    try {
      e.preventDefault();
      if (
        registerUsername.current.value.trim() !== "" &&
        registerEmail.current.value.trim() !== "" &&
        registerPassword.current.value.trim() !== ""
      ) {
        let res = await axios({
          method: "post",
          url: "https://noteflow-backend.onrender.com/api/auth/register",
          data: {
            username: registerUsername.current.value,
            email: registerEmail.current.value,
            password: registerPassword.current.value,
          },
        });

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard/notes");
      } else {
        toast.error("All fields are required");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className='login-register-form d-flex align-center justify-center'>
        <div className='form-container'>
          <h1>NoteFlow.</h1>
          <div className='form-options'>
            <button
              className={option === "Login" ? "active" : ""}
              onClick={() => setOption("Login")}>
              Login
            </button>
            <button
              className={option === "Register" ? "active" : ""}
              onClick={() => setOption("Register")}>
              Register
            </button>
          </div>
          <form
            className={
              option === "Login"
                ? "active login-form d-flex flex-col"
                : "login-form d-flex flex-col"
            }
            onSubmit={login}>
            <label htmlFor='email' className='d-flex flex-col'>
              <span> Email :</span>
              <input type='email' name='email' ref={loginEmail} />
            </label>
            <label htmlFor='password' className='d-flex flex-col'>
              <span> Password :</span>
              <input type='password' name='password' ref={loginPassword} />
            </label>
            <input type='submit' value='Login' />
          </form>
          <form
            className={
              option === "Register"
                ? "active register-form d-flex flex-col"
                : "register-form d-flex flex-col"
            }
            onSubmit={register}>
            <label htmlFor='username' className='d-flex flex-col'>
              <span> Username :</span>
              <input type='text' name='username' ref={registerUsername} />
            </label>
            <label htmlFor='email' className='d-flex flex-col'>
              <span>Email :</span>
              <input type='email' name='email' ref={registerEmail} />
            </label>
            <label htmlFor='password' className='d-flex flex-col'>
              <span>Password :</span>
              <input type='password' name='password' ref={registerPassword} />
            </label>
            <input type='submit' value='Register' />
          </form>
        </div>
      </div>
    </>
  );
}
