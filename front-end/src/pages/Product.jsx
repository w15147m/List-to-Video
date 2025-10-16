import React, { useState } from "react";
import CommonLayout from "../layouts/CommonLayout";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import sixMen from "../assets/images/Mens/six.jpg";
import tenMen from "../assets/images/Mens/ten.jpg";
import threeMen from "../assets/images/Mens/three.jpg";
import nineMen from "../assets/images/Mens/nine.jpg";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Tab, Tabs } from "react-bootstrap";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4); // Initial value
  return (
    <CommonLayout>
      <div className="container product-details">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product Title
            </li>
          </ol>
        </nav>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  direction="vertical"
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  <SwiperSlide>
                    <img src={threeMen} alt="" height={100} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={sixMen} alt="" height={100} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={nineMen} alt="" height={100} className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={tenMen} alt="" height={100} className="w-100" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  loop={true} // ✅ ok here
                  spaceBetween={0}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <img src={threeMen} alt="" className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={sixMen} alt="" className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={nineMen} alt="" className="w-100" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={tenMen} alt="" className="w-100" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>Product Title</h2>
            <div className="d-flex align-align-start-end gap-2">
              <Rating readOnly style={{ maxWidth: 100 }} value={rating} />
              <span>10 Reviews</span>
            </div>
            <div>
              <h3 className="">
                $78
                <span className="text-muted text-decoration-line-through mx-1">
                  $80
                </span>
              </h3>
            </div>
            <div className="d-flex gap-2">
              Lorem ipsum dolor sit
              <br />
              consectetur Lorem ipsum dolor sit amet <br />
              dolor dolorLorem ipsum sit amet consectetur
              <br />
            </div>
            <div className="sizes my-2">
              <strong>Select Size</strong>
              <div className="d-flex gap-3">
                <button className="btn btn-size">S</button>
                <button className="btn btn-size">M</button>
                <button className="btn btn-size">L</button>
                <button className="btn btn-size">XL</button>
              </div>
            </div>
            <div className="add-to-cart my-4">
              <button className="btn btn-primary text-uppercase">
                add to cart
              </button>
            </div>
            <hr />
            <div>
              <strong>SKU: </strong>
              DDXXCC342
            </div>
          </div>
        </div>
          <div className="rev-des mb-5 ">
            <Tabs
              defaultActiveKey="Description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Home">
                Tab content for Description
              </Tab>
              <Tab eventKey="profile" title="Reviews">
                Tab content for Reviews
              </Tab>
            </Tabs>
          </div>
      </div>
    </CommonLayout>
  );
};

export default Product;
