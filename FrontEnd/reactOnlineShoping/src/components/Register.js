import React from "react";
import { isEmail } from "validator";
import { useState } from "react";
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function Register() {
  // constructor(props) {
  //   super(props);
  //   this.handleRegister = this.handleRegister.bind(this);
  //   this.onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onChangeEmail = this.onChangeEmail.bind(this);
  //   this.onChangePassword = this.onChangePassword.bind(this);

  //   this.state = {
  //     username: "",
  //     email: "",
  //     password: "",
  //     successful: false,
  //     message: ""
  //   };
  // }

  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   });
  // }

  // onChangeEmail(e) {
  //   this.setState({
  //     email: e.target.value
  //   });
  // }

  // onChangePassword(e) {
  //   this.setState({
  //     password: e.target.value
  //   });
  // }

  const [stateRegister, setStateRegister] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    successful: false,
    message: ""
  });

  const handleRegister = (e) => {
    e.preventDefault();


    setStateRegister({
      ...stateRegister,
      message: "",
      successful: false
    });

    console.log("success");

    // this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        stateRegister.username,
        stateRegister.email,
        stateRegister.password,
        stateRegister.name,
        stateRegister.address,
        stateRegister.phone
      ).then(
        response => {
          setStateRegister({
            ...stateRegister,
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setStateRegister({
            ...stateRegister,
            successful: false,
            message: resMessage
          });
        }
      );
    // }
  }

  return (
    <div className="login">
    <div className="container">
      <div className="row pt-5">
        <div className="col-md-8"></div>
        <div className="col-md-4 p-4 mt-4" style={{backgroundColor:'white', borderRadius: '5px'}}>
        <form onSubmit={(e)=> handleRegister(e)}>
          {!stateRegister.successful && (
            <div>
              <div className="form-group">
                <h5> Đăng kí tài khoản </h5>

                <label htmlFor="username">Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={stateRegister.username}
                  onChange={(e) => setStateRegister({
                    ...stateRegister,
                    username: e.target.value,
                  })}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={stateRegister.email}
                  onChange={(e) => setStateRegister({
                    ...stateRegister,
                    email: e.target.value,
                  })}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={stateRegister.password}
                  onChange={(e) => setStateRegister({
                    ...stateRegister,
                    password: e.target.value,
                  })}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="name"
                  className="form-control"
                  name="name"
                  value={stateRegister.name}
                  onChange={(e) => setStateRegister({
                    ...stateRegister,
                    name: e.target.value,
                  })}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="address"
                  className="form-control"
                  name="address"
                  value={stateRegister.address}
                  onChange={(e) => setStateRegister({
                    ...stateRegister,
                    address: e.target.value,
                  })}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="phone"
                  className="form-control"
                  name="phone"
                  value={stateRegister.phone}
                  onChange={(e) => setStateRegister({
                    ...stateRegister,
                    phone: e.target.value,
                  })}
                  validations={[required, email]}
                />
              </div>

              <div className="form-group mt-2" >
                <button className="btn btn-primary btn-block">Đăng kí</button>
              </div>
            </div>
          )}

          {stateRegister.message && (
            <div className="form-group">
              <div
                className={
                  stateRegister.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
                {stateRegister.message}
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
