import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import "../styling/login.css";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState();
  const [loading, setLoading] = useState(false)

  const handleShow = () => {
    setShow(!show)
    myPasswordFunc()
  }

  const myPasswordFunc = (x) => {
    x = document.getElementById("myPassword")
    if (x.type === "password") {
      x.type = "text"
    } else {
      x.type = "password"
    }
  }

  const handleClick = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate()

  const LoginFun = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    axios.post('http://localhost:3005/login', user)
      .then(result => {
        console.log(result)
        if (result.data === "Success") {
          navigate('/')
          toast.error(result.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else{
          console.log('good')
          toast.error(result.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch(err => console.log(err))
  }

  const handleLogin = () => {
    LoginFun();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex items-center justify-center bg-gray-100 h-screen w-[100%]">
        <section className=" flex max-md:flex-col justify-around items-center  py-[50px] px-[40px] w-[70%] max-sm:w-full bg-white rounded-xl shadow-2xl shadow-gray-500 ">
          <div className="loginImg">
            <img src="/assets/logo_mark.png" alt="" />
          </div>
          <div className="w-[40%] max-sm:w-full">
            <center>
              <div className="text-[#A52922] text-[2rem] max-sm:text-[1.5rem] font-[700]">WELCOME :)</div>

              <div className="text-gray-700 mt-[-2px]">
                Ready to experience CRM? Sign up now and embark on a journey of innovation and convenience!
              </div>
            </center>
            <form onSubmit={handleSubmit}>
              <TextField
                className="loginInput"
                label="Email"
                fullWidth
                // value={email}
                name="email"
                onChange={handleClick}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                className="loginInput"
                label="Password"
                fullWidth
                type="password"
                name="password"
                id="myPassword"
                // value={password}
                onChange={handleClick}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: {
                    borderRadius: "10px",
                  },
                }}
              />
              {
                show ?
                  <div className="relative top-[-2.9rem] ml-auto w-[10%] text-[1.4rem]" onClick={() => handleShow()}> <AiFillEye /></div>
                  :
                  <div className="relative top-[-2.9rem] ml-auto w-[10%] text-[1.4rem]" onClick={() => handleShow()}> <AiFillEyeInvisible /></div>

              }

              <div className="flex items-center justify-between mt-[10px]">
                <p className="flex items-center">
                  <input type="checkbox" />
                  <label className="ml-[.4rem] text-[.9rem]">Remember for 30 days </label>
                </p>

                {/* <p className=" text-right text-[#A52922]" >Forget Password?</p> */}
              </div>
              {loading ?
                <LoadingButton
                  loading
                  loadingPosition="start"
                  className="loginButton !text-white"
                  variant="contained"
                  color="primary"
                  fullWidth
                // type="submit"
                >
                  Sign In
                </LoadingButton>
                :
                <Button
                  className="loginButton"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={LoginFun}
                // type="submit"
                >
                  Sign In
                </Button>
              }
              {/* <div>
                <Button
                  sx={{ marginTop: "10px", borderRadius: "10px" }}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  <img
                    src="/assets/google-logo.png"
                    className="w-[40px] h-[32px] mr-[.2rem]"
                    alt=""
                  />
                  Sign in with Google
                </Button>
              </div> */}
              <center>
                <div className="text-gray-500 mt-[1.5rem]">
                  Don't have an Account?
                  <a href="/packages">
                    <span className="text-[#A52922] font-[600] cursor-pointer hover:text-red-700">
                      {" "}
                      Sign Up
                    </span>
                  </a>
                </div>
              </center>

            </form>
          </div>
        </section>
      </div>
    </>

  );
};

export default Login;