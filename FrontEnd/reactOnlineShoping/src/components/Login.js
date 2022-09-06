import React from "react";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from 'react-router-dom';
import {useState } from "react";
import '../App.css';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

function Login() {
  const [stateLogin, setStateLogin] = useState({
    username: "",
    password: "",
    loading: false,
    message: ""
  });

  let navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();

    setStateLogin({
      ...stateLogin,
      message: "",
      loading: true
    });

    AuthService.login(stateLogin.username, stateLogin.password).then(
      () => {
        console.log("success");
        navigate(`/home`);
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setStateLogin({
          ...stateLogin,
          message: resMessage,
          loading: false
        });
      }
    );
    // } else {
    //   setStateLogin({
    //     ...stateLogin,
    //     loading: false
    //   });
    // }
  }

  return (
    <div className="login">
    <div className="container" style={{height: '680px'}}>
      <div className="row pt-5">
        <div className="col-md-8"></div>
        <div className="col-md-4 p-5 mt-4" style={{backgroundColor:'white', borderRadius: '5px'}}>
          <div className="mb-3 text-center">
            <img className="img-fluid"
              src="https://i.imgur.com/N9Kg4e1.png" width="50%"/>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={stateLogin.username}
                onChange={(e) => setStateLogin({
                  ...stateLogin,
                  username: e.target.value,
                })}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={stateLogin.password}
                onChange={(e) => setStateLogin({
                  ...stateLogin,
                  password: e.target.value,
                })}
                validations={[required]}
              />
            </div>

            <div className="form-group pt-3" style={{textAlign: 'center'}}>
              <button
                className="btn btn-primary btn-block"
                disabled={stateLogin.loading}
                style = {{padding: "5px 30px"}}
              >
                {stateLogin.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Đăng nhập</span>
              </button>
              <br/><br/>
              <span> Chưa có tài khoản?  <Link to={'/register'} style={{textDecoration: 'none'}}>Đăng kí ngay</Link> </span>
            </div>

            {stateLogin.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {stateLogin.message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
