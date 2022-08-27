import React from 'react'
import { Link } from "react-router-dom";
import authService from '../services/auth.service';
import logo from "../image/logo1.jpg";
import { useEffect, useState } from "react";
import "../css/main.css";
import "../css/Layout.css";

// import AuthVerify from "./common/auth-verify";
import eventBus from '../common/EventBus';

export default function Header() {
  const [stateLogin, setStateLogin] = useState({
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined
  });
  const [logOut, setLogOut] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {

    const userGet = authService.getCurrentUser();
    if (userGet) {
      setStateLogin({
        currentUser: userGet,
        showModeratorBoard: userGet.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: userGet.roles.includes("ROLE_ADMIN")
      });
      setUser(userGet);
    }

    setLogOut(authService.logout());
    eventBus.on("logout", () => {
      logOut.logOut();
    });

    return () => {
      eventBus.remove("logout")
    }
  }, []);

  const clickView = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light"
      >
        <div className="container-fluid" style={{fontSize: '.8rem'}}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">

              <li className="nav-item">
                <Link className="nav-link text-light"  aria-current="page"
                  to="/About"
                  onClick={clickView}>
                  Trang chủ |
                </Link>
              </li>

              <li className="nav-item dropdown ">
                <Link className="nav-link text-light" to="/Menu" onClick={clickView}>
                  Tải ứng dụng |
                </Link>
              </li>

              <li class="nav-item ">
                <Link class="nav-link text-light" aria-current="page"
                  to="/Services"
                  onClick={clickView}>
                  Kết nối |
                </Link>
              </li>

              <li class="nav-item ">
                <Link class="nav-link text-light" aria-current="page"
                  to="/Services"
                  onClick={clickView}>
                  Về chúng tôi
                </Link>
              </li>

              {stateLogin.showAdminBoard && (
                <>
                  <li className="nav-item dropdown text-light">
                <span className="nav-link">
                Quản lí{" "}
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ backgroundColor: "#D19527" }}
                >
                  <li>
                  <Link to="/employee" class="dropdown-item text-light">
                        Quản lí nhân viên
                      </Link>
                  </li>
                  <li>
                  <Link to="/branches"  class="dropdown-item text-light">
                       Quản lí chi nhánh
                      </Link>
                  </li>

                  <li>
                  <Link to="/cashier"  class="dropdown-item text-light">
                       Quản lí bàn
                      </Link>
                  </li>

                </ul>
              </li>
                </>
              )}

              {stateLogin.showModeratorBoard && (
                <>

              <li className="nav-item dropdown">
                <span className="nav-link text-light">
                ĐẦU BẾP{" "}
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ backgroundColor: "#D19527" }}
                >
                  <li>
                  <Link to="/chefFoodManager" class="dropdown-item text-light">
                        Quản lí tình trạng món ăn
                      </Link>
                  </li>
                  <li>
                  <Link to="/chef"  class="dropdown-item text-light">
                       Quản lí thực đơn ngày
                      </Link>
                  </li>
                </ul>
              </li>
                </>
              )}

              {stateLogin.currentUser && (
                <>
              <li className="nav-item dropdown">
                <span className="nav-link text-light">
                Nhân viên{" "}
                </span>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{ backgroundColor: "#D19527" }}
                >
                  <li>
                  <Link to="/table" class="dropdown-item text-light">
                      Order
                    </Link>
                  </li>
                  <li>
                  <Link to="/cashier"  class="dropdown-item text-light">
                  Table
                      </Link>
                  </li>
                  <Link to="/ManageBill" class="dropdown-item text-light">
                  Bill
                    </Link>
                </ul>
              </li>
                </>
              )}
            </ul>
            <form class="form-inline my-2 my-lg-0">
              {stateLogin.currentUser ? (
                <div className="navbar-nav ml-auto ms-auto">
                  <li className="nav-item text-light">
                    <Link to="/profile" className="nav-link text-light">
                      {stateLogin.currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item text-light">
                    <Link
                      to="/login"
                      className="nav-link text-light"
                      onClick={() => logOut()}
                    >
                      LogOut
                    </Link>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto ms-auto">
                  <li className="nav-item text-light">
                    <Link to="/login" className="nav-link text-light">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item text-light">
                    <Link to="/register" className="nav-link text-light">
                      Register
                    </Link>
                  </li>

                </div>
              )}
            </form>
          </div>
        </div>
      </nav>

    </React.Fragment >
  )
}