import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Home = () => {
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
                  <div className="carousel-item active">
                    <img className="img-fluid" src="https://i.imgur.com/QTLyhzM.jpeg" />
                  </div>
                  <div className="carousel-item">
                    <img className="img-fluid" src="https://i.imgur.com/Q9hbvr5.jpeg " />
                  </div>
                  <div className="carousel-item">
                    <img className="img-fluid" src="https://i.imgur.com/fFLL4VV.jpeg" />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
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

        <div className="container mt-4" style={{ backgroundColor: 'white', border: '1px solid lightgrey' }}>
          <div className="pt-3 ps-2 text-secondary"> DANH MỤC</div>
          <div className="row g-4" style={{ paddingBottom: '1rem', paddingTop: '.7rem' }}>
            <div className="col-md-2">
              <div className="card p-1">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Điện</span> <span>thoại</span> </div>
                  <div> <img src="https://i.imgur.com/WgqOgAJ.png" height="87" width="100" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Đồng</span> <span>hồ</span> </div>
                  <div> <img src=" https://i.imgur.com/NNEPrFe.jpeg" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Máy</span> <span>ảnh</span> </div>
                  <div> <img src="https://i.imgur.com/VPJkQuK.jpeg" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Laptops</span> </div>
                  <div> <img src="https://i.imgur.com/JwePSoS.jpeg" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"><span>TV</span> </div>
                  <div style={{ paddingLeft: '10px' }}> <img src=" https://i.imgur.com/Zq8VigZ.png" height="80" width="100" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Gia</span> <span>dụng</span> </div>
                  <div> <img src="https://i.imgur.com/e9CyhXR.png" height="80" width="60" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Thời trang</span> </div>
                  <div> <img src="https://i.imgur.com/UtgJh1l.png" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Giày dép</span> </div>
                  <div> <img src="https://i.imgur.com/erLGVLv.png" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Sắc đẹp</span> </div>
                  <div> <img src="https://i.imgur.com/TZ7UbLP.png" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Mẹ và bé</span> </div>
                  <div> <img src="https://i.imgur.com/hYXxKwo.jpeg" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Sức khỏe</span> </div>
                  <div> <img src="https://i.imgur.com/wFxPyxC.png" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card p-2">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <span>Sách</span> </div>
                  <div> <img src="https://i.ibb.co/YBTgf53/1ec6555cccd1de933f59008606668d0b.jpg" height="80" width="80" /> </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------CATAGORIES----------------------------------------------------- */}
        {/* ------------------------------------------------CATAGORIES----------------------------------------------------- */}

        <div className="container mt-4" style={{ backgroundColor: 'white', border: '1px solid lightgrey' }}>

          <div className="pt-3 ps-2 text-secondary"> FLASH SALE</div>

          <div>
            <Swiper className='ps-9'
              breakpoints={{
                390: {
                  // width: 576,
                  slidesPerView: 3,
                },
                768: {
                  // width: 768,
                  slidesPerView: 5,
                },
              }}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50}
              navigation
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}

              style={{
                "--swiper-navigation-color": "black",
                "--swiper-navigation-size": "16px",
              }}
            >
              <SwiperSlide><img src='https://www.leaderim.com/wp-content/uploads/2020/02/Partner-logo-2016.png' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://www.pngfind.com/pngs/m/683-6836144_cisco-partner-logo-cisco-partner-logo-vector-hd.png' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://thumbs.dreamstime.com/b/partner-logo-design-ai-supported-81271814.jpg' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXfIvUx5yLhleD_vSTSP6NTY0HoYy1YwHVi6mnCNQ93UdwoKnTbO5EWDJAGyMk_loSIA&usqp=CAU' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://us.123rf.com/450wm/nakigitsune111/nakigitsune1111806/nakigitsune111180600285/103380642-the-logo-between-the-letter-s-and-letter-o-or-so-with-a-certain-distance-and-connected-by-orange-and.jpg?ver=6' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-R9fTatXZD2vZGInGIbNCwGeL0KxF-HkkQYaH8_p3yuKbVVg7vw6iavRqRod9lkVf5lg&usqp=CAU' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://allvectorlogo.com/img/2016/10/sap-partner-logo.png' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://www.seekpng.com/png/detail/209-2091194_rheem-pro-partner-logo.png' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjFJ4p95Vx4W9CWNldLVkcLmDwFl15SSGzjg&usqp=CAU' height={70} /></SwiperSlide>
              <SwiperSlide><img src='https://findlogovector.com/wp-content/uploads/2019/10/business-integration-partners-bip-logo-vector.png' height={70} /></SwiperSlide>
              <br />
            </Swiper>
          </div>

        </div>

        {/* -------------------------------------------------FLASH SALE---------------------------------------------------------------- */}
        {/* -------------------------------------------------FLASH SALE---------------------------------------------------------------- */}


              

      </div>
    </>
  );
};
export default Home;
