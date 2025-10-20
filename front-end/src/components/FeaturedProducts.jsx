import React from "react";
import sixMen from "../assets/images/Mens/six.jpg";
import tenMen from "../assets/images/Mens/ten.jpg";
import threeMen from "../assets/images/Mens/three.jpg";
import nineMen from "../assets/images/Mens/nine.jpg";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  return (
    <>
      <h2>New article</h2>
      <span className="row">
        <div className="col-md-3 col-6 mt-3">
          <div className="product card border-0">
            <div className="card-img">
              <Link to="/Product" >
              <img src={sixMen} alt="" className="w-100" />
              </Link>
            </div>
            <div className="card-body p-0 pt-2 font-18">
              <Link to="/Product" className="font-19">
                Red check shirt
              </Link>
              <div className="price">
                $70{" "}
                <span className="text-decoration-line-through text-muted cursor-pointer">
                  $75
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6 mt-3">
          <div className="product card border-0">
            <div className="card-img">
              <img src={tenMen} alt="" className="w-100" />
            </div>
            <div className="card-body p-0 pt-2 font-18">
              <a href="" className="font-19">
                Red check shirt
              </a>
              <div className="price">
                $70{" "}
                <span className="text-decoration-line-through text-muted cursor-pointer">
                  $75
                </span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 col-6 mt-3">
          <div className="product card border-0">
            <div className="card-img">
              <img src={threeMen} alt="" className="w-100" />
            </div>
            <div className="card-body p-0 pt-2 font-18">
              <a href="" className="font-19">
                Red check shirt
              </a>
              <div className="price">
                $70{" "}
                <span className="text-decoration-line-through text-muted cursor-pointer">
                  $75
                </span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 col-6 mt-3">
          <div className="product card border-0">
            <div className="card-img">
              <img src={nineMen} alt="" className="w-100" />
            </div>
            <div className="card-body p-0 pt-2 font-18">
              <a href="" className="font-19">
                Red check shirt
              </a>
              <div className="price">
                $70{" "}
                <span className="text-decoration-line-through text-muted cursor-pointer">
                  $75
                </span>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-3 col-6 mt-3">
          <div className="product card border-0">
            <div className="card-img">
              <img src={sixMen} alt="" className="w-100" />
            </div>
            <div className="card-body p-0 pt-2 font-18">
              <a href="" className="font-19">
                Red check shirt
              </a>
              <div className="price">
                $70{" "}
                <span className="text-decoration-line-through text-muted cursor-pointer">
                  $75
                </span>
              </div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
}

export default FeaturedProducts;
