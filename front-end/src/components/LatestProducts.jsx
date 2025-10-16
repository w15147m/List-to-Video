import React from "react";
import eightMen from "../assets/images/Mens/eight.jpg";
import fourMen from "../assets/images/Mens/four.jpg";
import { Link } from "react-router-dom";
function LatestProducts() {
  return (
    <>
        <h2>New article</h2>
        <div className="row">
          <div className="col-md-3 col-6 mt-3">
            <div className="product card border-0">
              <div className="card-img">
              <Link to="/Product" >
                <img src={fourMen} alt="" className="w-100" />
              </Link>

              </div>
              <div className="card-body p-0 pt-2 font-18">
                <Link to="/product" className="font-19">
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
                <img src={eightMen} alt="" className="w-100" />
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
                <img src={fourMen} alt="" className="w-100" />
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
                <img src={eightMen} alt="" className="w-100" />
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
                <img src={fourMen} alt="" className="w-100" />
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
        </div>
    </>
  );
}

export default LatestProducts;
