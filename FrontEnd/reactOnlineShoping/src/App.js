import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AnimatedInput } from "./common/searchScript";
//----------------common---------------------------
import eventBus from "./common/EventBus";
import { Link } from "react-router-dom";
import authService from "./services/auth.service";
// -----------------css----------------------------
import './App.css';
//------------------pages---------------------------
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from './components/Footer';
import HomeMain from './pages/Home';
import Profile from "./pages/Profile";
import PersonalStore from "./pages/productManager/PersonalStore";
import StoreAdmin from "./pages/productManager/StoreAdmin";
import ProductManager from "./pages/productManager/ProductManager";
import ProductDetail from "./pages/productManager/ProductDetail";

export const UserContext = createContext();

function App() {
    const [stateLogin, setStateLogin] = useState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    });
    const [logout, setLogout] = useState(null);
  
    useEffect(() => {
  
      const userGet = authService.getCurrentUser();
  
      if (userGet) {
        setStateLogin({
          currentUser: userGet,
          showModeratorBoard: userGet.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: userGet.roles.includes("ROLE_ADMIN")
        });
      }
  
      setLogout(authService.logout());
      eventBus.on("logout", () => {
        logout.logOut();
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
    <div className="App">
       <BrowserRouter>
       <React.Fragment>
          <div className="header d-block">
            <nav
              className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid" style={{ fontSize: '.8rem' }}>
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
                      <Link className="nav-link text-light" aria-current="page"
                        to="/About"
                        onClick={clickView}>
                        Trang chủ &#160;  |
                      </Link>
                    </li>

                    <li className="nav-item dropdown ">
                      <Link className="nav-link text-light" to="/Menu" onClick={clickView}>
                        Tải ứng dụng &#160;  |
                      </Link>
                    </li>

                    <li className="nav-item ">
                      <Link className="nav-link text-light" aria-current="page"
                        to="/Services"
                        onClick={clickView}>
                        Kết nối &#160;  |
                      </Link>
                    </li>

                    <li className="nav-item ">
                      <Link className="nav-link text-light" aria-current="page"
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
                              <Link to="/employee" className="dropdown-item text-light">
                                Quản lí nhân viên
                              </Link>
                            </li>
                            <li>
                              <Link to="/branches" className="dropdown-item text-light">
                                Quản lí chi nhánh
                              </Link>
                            </li>

                            <li>
                              <Link to="/cashier" className="dropdown-item text-light">
                                Quản lí bàn
                              </Link>
                            </li>

                          </ul>
                        </li>
                      </>
                    )}

                    {stateLogin.currentUser && (
                      <>
                          <Link to='/storeAdmin' className="nav-link text-light">
                            | &#160; Cửa hàng
                          </Link>

                          <Link to='/addProduct' className="nav-link text-light">
                            | &#160; Đăng bán
                          </Link>
                      </>
                    )}
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    {stateLogin.currentUser ? (
                      <div className="navbar-nav ml-auto ms-auto">
                        <li className="nav-item text-light">
                          <Link to={"/profile"} className="nav-link text-light">
                            {stateLogin.currentUser.username}
                          </Link>
                        </li>
                        <li className="nav-item text-light">
                          <Link
                            to="/login"
                            className="nav-link text-light"
                            onClick={() => logout()}
                          >
                            | &#160;Đăng xuất
                          </Link>
                        </li>
                      </div>
                    ) : (
                      <div className="navbar-nav ml-auto ms-auto">
                        <li className="nav-item text-light">
                          <Link to="/login" className="nav-link text-light">
                            Đăng nhập &#160; |
                          </Link>
                        </li>

                        <li className="nav-item text-light">
                          <Link to="/register" className="nav-link text-light">
                            Đăng kí
                          </Link>
                        </li>

                      </div>
                    )}
                  </form>
                </div>
              </div>
            </nav>

            <nav className="searchBar navbar navbar-expand-lg navbar-light">
              <div className="container pb-2">
                <span className='me-auto'>
                  <Link to="/" className="link-icon">
                    <img className="img-fluid"
                      src='https://i.imgur.com/N9Kg4e1.png'
                      style={{ width: "58px", height: "50px" }}
                    ></img>
                    <span className='font-weight-bold'> Shopdee</span>
                  </Link>
                </span>

                <span>

                  <form className="d-flex ms-auto me-auto">
                    <AnimatedInput className='form-control me-2' style={{ width: '350px' }} placeholder="Bạn muốn tìm gì ?... áo thun, áo hoodie,..........iphone, samsung........" aria-label="Search" />
                    <button type="button" className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </span>

                <span className='ms-auto text-light'> <i className="fas fa-shopping-cart"></i></span>
              </div>
            </nav>
          </div>
        </React.Fragment >

      <UserContext.Provider value={stateLogin.currentUser}>
      <Routes>
        <Route exact path="/*" element={<HomeMain />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/store" element={<PersonalStore/>}/>
        <Route path="/productManager" element={<ProductManager/>}/>
        <Route path="/storeAdmin" element={<StoreAdmin/>}/>
        <Route path="/store/:storeId" element={<PersonalStore/>}/>
        <Route path="/product/:productId" element={<ProductDetail/>}/>
      </Routes>
      </UserContext.Provider>
      
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App;
