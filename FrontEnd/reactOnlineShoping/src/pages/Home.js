import React from "react";
import anh1 from "../image/anh1.jpg";
import anh2 from "../image/anh2.jpg";
import daubep from "../image/daubep.jpg";
import chicken from "../image/chicken.png";
import Banqueting from "../image/Banqueting.jpg";
import Meeting from "../image/Meeting.jpg";
import home from "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="row" style={{marginTop: '3rem'}}>
          <div className="col-md-8">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-9db9afa9dc48742dd1f63f4b3e970eb1_screen.jpg?ts=1605628683" class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item">
                  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-fashion-sale-banner-template-design-cc34c2027d0bb5ccc2ff90231abaa242_screen.jpg?ts=1613395464" class="d-block w-100" alt="..."/>
                </div>
                <div class="carousel-item">
                  <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fashion-sale-banner-template-design-389dc7a74f096738d1d425314404a2cd_screen.jpg?ts=1605613724" class="d-block w-100" alt="..."/>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="col-md-4 d-none d-sm-block">
            <div> <img src="https://i.pinimg.com/736x/63/9a/cd/639acd66ea4734eb8be8a9db5f85f3ad.jpg" width='80%'/> </div>
            <div style={{marginTop: '2rem'}}> <img src="https://img.freepik.com/premium-vector/fashion-banner-background-web-banner-billboard-fashion-promotion-funny-design-concept_142491-93.jpg" width='80%'/> </div>
          </div>

        </div>
      </div>
    </>
  );
};
export default Home;
