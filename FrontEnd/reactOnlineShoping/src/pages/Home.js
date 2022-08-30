import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import ProductServices from "../services/ProductServices";


const Home = () => {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  const min = 1;
  const max = 60;
  var timer;
  const rand = Math.floor(Math.random() * (max - min + 1)) + min;
  const [minutes, setMinutes] = useState(rand);
  const [seconds, setSeconds] = useState(rand);
  var formattedMinutes = ("0" + minutes).slice(-2);
  var formattedSeconds = ("0" + seconds).slice(-2);

  useEffect(() => {
    let string = minutes.toString();
    window.localStorage.setItem('timer', string);
    // console.log('string test: '+string);
  }, [minutes]);

  useEffect(()=>{
    const data = window.localStorage.getItem('timer');
    let time = parseInt(data);
    setMinutes(time);
    // console.log(time);
  }, [])

  useEffect(()=>{
    if(minutes >=0){
    timer = setInterval(()=>{
      setSeconds(seconds-1);
      if(seconds===0){
        setMinutes(minutes-1);
        setSeconds(59);
      }
    },1000)

    return () => clearInterval(timer);
  }
  else if(minutes === -1){
    setMinutes(rand);
    setSeconds(rand-1);
  }
  },[seconds]);

  useEffect(() => {
    ProductServices.getAllProducts(searchTerm).then((res) => {
      setProducts(res.data);
    })
  }, [searchTerm]);

  const productPerPage = 8;
  const pagesVisited = pageNumber * productPerPage;

  const pageCount = Math.ceil(products.length / productPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  var listFlashSale = [];

  if (products.length !== null) {
    listFlashSale = products.map((product) => {
      if (minutes>=0 && !product.productStatus) {
        return (
          <SwiperSlide key={product.productId}>
            <Link className="product-link" to={'/product/'+product.productId}>
            <div className="card" style={{ textAlign: 'left', fontSize: '.9rem', width: '12.6rem' }}>
              <img src={product.productImage} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-title textOverflow " style={{ textTransform: 'uppercase', textAlignLast: 'justify', }}>{product.productName}</p>
                <p><span style={{ backgroundColor: '#26aa99', padding: '3px', fontSize: '.6rem', fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(250, 247, 247)' }}> <i className="fa fa-shipping-fast"></i>&#160; FREE SHIP</span></p>
                <p className="card-text" style={{ textAlignLast: 'justify', }}><span style={{ color: 'grey', textDecoration: 'line-through', fontStyle: 'italic',fontSize: '.8rem' }}><sup>đ</sup>{product.productOldPrice.toLocaleString("en-US")}</span> &#160;
                  <span style={{ color: 'rgb(255, 38, 0)', fontSize: '.9rem' }}><sup>đ</sup>{product.productNewPrice.toLocaleString("en-US")}</span> </p>
              </div>
            </div>
            </Link>
          </SwiperSlide>
        )
      }
    })
  }

  var listProduct = [];

  if (products.length !== null) {
    listProduct = products.slice(pagesVisited, pagesVisited + productPerPage).map((product) => (
      <div className="col-xl-3 col-md-3 mb-3 mt-3 ">
        <div className="card" style={{ textAlign: 'left', fontSize: '.9rem' }}>
          <img src={product.productImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-title textOverflow " style={{ textTransform: 'uppercase', textAlignLast: 'justify', }}>{product.productName}</p>
            <p><span style={{ backgroundColor: '#26aa99', padding: '3px', fontSize: '.6rem', fontWeight: 'bold', fontStyle: 'italic', color: 'rgb(250, 247, 247)' }}> <i className="fa fa-shipping-fast"></i>&#160; FREE SHIP</span></p>
            <p className="card-text" style={{ textAlignLast: 'justify', }}><span style={{ color: 'grey', textDecoration: 'line-through', fontStyle: 'italic' }}><sup>đ</sup>{product.productOldPrice.toLocaleString("en-US")}</span> &#160;
              <span style={{ color: 'rgb(255, 38, 0)', fontSize: '1.1rem' }}><sup>đ</sup>{product.productNewPrice.toLocaleString("en-US")}</span> </p>
          </div>
        </div>
      </div>
    ));
  }
  else {
    return (
      <h1> NO PRODUCT </h1>
    )
  }

  return (
    <>
      <div className="home">
        <div className="container p-0">
          <div className="row">
            <div className="col-md-8" style={{ marginTop: '3rem' }}>
              <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner " style={{ borderRadius: '5px' }}>
                  <div className="carousel-item active"><img className="img-fluid" src="https://i.imgur.com/QTLyhzM.jpeg" /></div>
                  <div className="carousel-item"><img className="img-fluid" src="https://i.imgur.com/Q9hbvr5.jpeg " /></div>
                  <div className="carousel-item"><img className="img-fluid" src="https://i.imgur.com/fFLL4VV.jpeg" /></div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="visually-hidden">Previous</span></button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="visually-hidden">Next</span></button>
              </div>
            </div>

            <div className="col-md-4 d-none d-sm-block d-md-block" style={{ marginTop: '3rem' }}>
              <div> <img className="img-fluid" src="https://i.imgur.com/lGwTJW4.jpeg" style={{ borderRadius: '5px' }} /> </div>
              <div style={{ marginTop: '.9rem' }}> <img className="img-fluid" src="https://i.imgur.com/qFMbdhl.jpeg" style={{ borderRadius: '5px' }} /> </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------CAROUSEL------------------------------------ */}
        {/* ------------------------------------CAROUSEL------------------------------------ */}

        <div className="container mt-3"><img src="https://cf.shopee.vn/file/3bd07c36ac8112697c5c0a44c620a838" width='100%'></img></div>


        <div className="container mt-3" style={{ backgroundColor: 'white', border: '1px solid lightgrey' }}>
          <div className="pt-3 ps-2 text-secondary" style={{textAlign: 'left'}}> <i className="fa fa-list"></i>&#160; DANH MỤC</div>
          <div className="row g-4" style={{ paddingBottom: '1rem', paddingTop: '.7rem' }}>
            <div className="col-md-2"><div className="card p-1"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Điện</span> <span>thoại</span> </div><div> <img src="https://i.imgur.com/WgqOgAJ.png" height="87" width="100" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Đồng</span> <span>hồ</span> </div><div> <img src=" https://i.imgur.com/NNEPrFe.jpeg" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Máy</span> <span>ảnh</span> </div><div> <img src="https://i.imgur.com/VPJkQuK.jpeg" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Laptops</span> </div><div> <img src="https://i.imgur.com/JwePSoS.jpeg" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"><span>TV</span> </div><div style={{ paddingLeft: '10px' }}> <img src=" https://i.imgur.com/Zq8VigZ.png" height="80" width="100" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Gia</span> <span>dụng</span> </div><div> <img src="https://i.imgur.com/e9CyhXR.png" height="80" width="60" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Thời trang</span> </div><div> <img src="https://i.imgur.com/UtgJh1l.png" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Giày dép</span> </div><div> <img src="https://i.imgur.com/erLGVLv.png" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Sắc đẹp</span> </div><div> <img src="https://i.imgur.com/TZ7UbLP.png" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Mẹ và bé</span> </div><div> <img src="https://i.imgur.com/hYXxKwo.jpeg" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Sức khỏe</span> </div><div> <img src="https://i.imgur.com/wFxPyxC.png" height="80" width="80" /> </div></div></div></div>
            <div className="col-md-2"><div className="card p-2"><div className="d-flex justify-content-between align-items-center p-2"><div className="flex-column lh-1 imagename"> <span>Sách</span> </div><div> <img src="https://i.ibb.co/YBTgf53/1ec6555cccd1de933f59008606668d0b.jpg" height="80" width="80" /> </div></div></div></div>

          </div>
        </div>

        {/* ------------------------------------------------CATAGORIES----------------------------------------------------- */}
        {/* ------------------------------------------------CATAGORIES----------------------------------------------------- */}

        <div className="container mt-4 pb-4" style={{ backgroundColor: 'white', border: '1px solid lightgrey' }}>

          <div className="pt-3 ps-2" style={{textAlign: 'left'}}> <span style={{color: 'rgb(255, 94, 0)', fontWeight: 'bold', fontSize: '1.2rem'}}><i className="fa fa-bolt"></i> FLASH SALE</span> <span style={{backgroundColor: 'rgb(4, 4, 97)', padding: '3px', color:'white', marginLeft: '6px', fontSize: '.75rem'}}>00</span> <span style={{backgroundColor: 'rgb(4, 4, 97)', padding: '3px', color:'white', fontSize: '.75rem'}}>{formattedMinutes}</span> <span style={{backgroundColor: 'rgb(4, 4, 97)', padding: '3px', color:'white', fontSize: '.75rem'}}>{formattedSeconds}</span>  </div>

          <div className="mt-3">
            <Swiper className='ps-9'
              breakpoints={{
                390: {slidesPerView: 2,},
                768: {slidesPerView: 3,},
                820: {slidesPerView: 4,},
                980: {slidesPerView: 5,},}}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50} navigation autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
              style={{"--swiper-navigation-color": "black","--swiper-navigation-size": "16px",}}>
              {listFlashSale}
            </Swiper>
          </div>

        </div>

        {/* -------------------------------------------------FLASH SALE---------------------------------------------------------------- */}
        {/* -------------------------------------------------FLASH SALE---------------------------------------------------------------- */}

          <div className="container pt-5"> </div>

      </div>
    </>
  );
};
export default Home;
