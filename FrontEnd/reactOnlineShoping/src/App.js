import React, { createContext } from "react";
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AnimatedInput } from "./common/searchScript";
//----------------common---------------------------
import eventBus from "./common/EventBus";
import { Link,useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux/es/exports";
import { DLT } from "./pages/redux/action";
import Cart from "./pages/Cart";
import AddNewProduct from "./pages/productManager/AddNewProduct";
import EditProduct from "./pages/productManager/EditProduct";
import AddNewStore from "./pages/productManager/AddNewStore";
import Category from "./pages/categories/category";
import SearchResult from "./pages/categories/searchResult";
import Success from "./pages/productManager/PaymentSuccess";

export const UserContext = createContext();
export const CartContext = createContext();

const App = () => {

  // ------------------------------------------------------HEADER-------------------------------------------------------------------
   // ------------------------------------------------------HEADER-------------------------------------------------------------------

  const [stateLogin, setStateLogin] = useState({
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined
  });
  const [logout, setLogout] = useState(null);
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const onClickEnter = (event) => {
    if (event.key === 'Enter') {
      navigate("/search/"+searchTerm);
    }
  }

  const search = () => {
    navigate("/search/"+searchTerm);
  }

  const dlt = (id) => {
    dispatch(DLT(id));
    console.log('ok')
  }

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.productNewPrice + price;
    });
    setPrice(price);
  }

  useEffect(() => {
    total();
  }, [total])

  return (
    <div className="App">
      <React.Fragment>
        <div className="header d-block">
          <nav
            className="navbar navbar-expand-lg navbar-light" style={{ padding: '0' }}>
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
                      to="/"
                      onClick={clickView}>
                      Trang chủ &#160;  |
                    </Link>
                  </li>

                  <li className="nav-item dropdown ">
                    <Link className="nav-link text-light" to="/app" onClick={clickView}>
                      Tải ứng dụng &#160;  |
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link className="nav-link text-light" aria-current="page"
                      to="/connect"
                      onClick={clickView}>
                      Kết nối &#160;  |
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <a className="nav-link text-light" aria-current="page"
                      href="https://github.com/dungnguyenhd"
                      onClick={clickView}>
                      Về tôi
                    </a>
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
                        </ul>
                      </li>
                    </>
                  )}

                  {stateLogin.currentUser && (
                    <>
                      <Link to='/storeAdmin' className="nav-link text-light" onClick={clickView}>
                        | &#160; Cửa hàng
                      </Link>

                      <Link to='/addNewProduct' className="nav-link text-light" onClick={clickView}>
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
                        <Link to="/login" className="nav-link text-light" onClick={clickView}>
                          Đăng nhập &#160; |
                        </Link>
                      </li>

                      <li className="nav-item text-light">
                        <Link to="/register" className="nav-link text-light" onClick={clickView}>
                          Đăng kí
                        </Link>
                      </li>

                    </div>
                  )}
                </form>
              </div>
            </div>
          </nav>

          <div className="searchBar container-fluid">
            <div className="container">
              <div className="row">
                <div className='col-lg-2 col-md-2 me-auto' style={{ textAlign: 'left' }}>
                  <Link to="/" className="link-icon" onClick={clickView}>
                    <img className="img-fluid"
                      src='https://i.imgur.com/N9Kg4e1.png'
                      style={{ width: "58px", height: "50px" }}
                    ></img>
                    <span className='font-weight-bold'> Shopdee</span>
                  </Link>
                </div>

                <div className="col-lg-8 col-md-8">
                  <form className="d-flex" style={{ justifyContent: 'center' }}>
                    <AnimatedInput className='form-control me-2' style={{ width: '550px' }} placeholder="Bạn muốn tìm gì ?... áo thun, áo hoodie,......điện thoại iphone, samsung........" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={onClickEnter} />
                    <button type="button" className="btn btn-primary" onClick={() => search()}>
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>

                <div className="dropdown-center col-lg-2 col-md-2" style={{ textAlign: 'right' }}>
                  <button type="button" className="btn btn-muted position-relative " data-bs-toggle="dropdown">
                    <i className="fa fa-shopping-cart text-light fs-5"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '.8rem' }}>
                      {getdata.length}
                    </span>
                  </button>
                  <div className="animate slideIn dropdown-menu container mt-3" style={{ width: '24rem' }}>
                    {getdata.length > 0 ? (
                      <>
                        <div className="row" style={{ padding: '0' }}> <div className="col-md-3 text-center" style={{ borderRight: '2px solid lightgray', fontSize: '.9rem' }}><span style={{ borderBottom: '2px solid lightgray' }}>Ảnh</span>  </div> <div className="col-md-7 text-center" > <span style={{ borderBottom: '2px solid lightgray' }}>Sản phẩm </span> </div> <div className="col-md-2 text-center"><button className="btn btn-muted  p-0">x</button> </div>  </div>
                        {getdata.map((item, index) => {
                          return (
                            <div className="row" style={{ textAlign: 'left' }} key={index}>
                              <div className="col-md-3 pt-2" style={{ borderRight: '2px solid lightgray' }}> <Link to={'/product/' + item.productId}><img src={item.productImage} height='80px' /></Link> </div>
                              <div className="col-md-7 pt-2" style={{ fontSize: '.8rem' }}> <span className="text-name">{item.productName.toUpperCase()}</span>  <br /> Đơn giá: {item.productNewPrice.toLocaleString("en-US")} vnđ </div>
                              <div className="col-md-2 text-center"> <button className="btn btn-muted" onClick={() => dlt(index)}><i className="fa fa-trash text-danger text-center pt-4"></i></button> </div>
                              <hr />
                            </div>
                          )
                        })}
                        <div className="row ps-4"> Tổng:&#160;&#160; {price.toLocaleString("en-US")} vnđ </div> <hr />
                        <div className="text-center"> <Link to={'/cart/'}><button className="btn btn-primary"> Xem giỏ hàng </button></Link>  </div>
                      </>
                    ) : (<div style={{ width: '24rem', textAlign: 'center' }}>
                      <img src='https://www.kasturijewellers.in/uploads/loader.gif' width='50%' />
                      <span className="dropdown-item">Giỏ hàng của bạn chưa có sản phẩm nào</span>
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >

      {/* // ------------------------------------------------------ROUTER-------------------------------------------------------------------
      // ------------------------------------------------------ROUTER------------------------------------------------------------------- */}

      <UserContext.Provider value={stateLogin.currentUser}>
        <CartContext.Provider value={getdata}>
          <Routes>
            <Route exact path="/*" element={<HomeMain />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/store" element={<PersonalStore />} />
            <Route path="/productManager" element={<ProductManager />} />
            <Route path="/storeAdmin" element={<StoreAdmin />} />
            <Route path="/store/:storeId" element={<PersonalStore />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addNewProduct" element={<AddNewProduct />} />
            <Route path="/addNewStore" element={<AddNewStore />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/search/:name" element={<SearchResult />} />
            <Route path="/payment" element={<Success />} />
          </Routes>
        </CartContext.Provider>
      </UserContext.Provider>

      <Footer />
    </div>
  )
}

export default App;
