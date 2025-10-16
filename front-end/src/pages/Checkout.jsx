import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import CommonLayout from "../layouts/CommonLayout";
import sixMen from "../assets/images/Mens/six.jpg";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState([]);

  return (
    <CommonLayout>
      <div className="container cart-page mb-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Checkout
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <h3 className=" pb-3 col-md-12">
              <strong>Billing details</strong>
            </h3>
            <hr />
            <form action="">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name=""
                    id=""
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name=""
                    id=""
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name=""
                    id=""
                    placeholder="Address"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name=""
                    id=""
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    name=""
                    id=""
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Zip"
                    name=""
                    id=""
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Mobile"
                    name=""
                    id=""
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-5">
            <h3 className=" pb-3 col-md-12">
              <strong>Billing details</strong>
            </h3>
            <hr />
            <table className="table ">
              <tbody>
                <tr>
                  <td valign="middle" width={80}>
                    <img src={sixMen} width={80} alt="" />
                  </td>
                  <td valign="middle" width={400}>
                    <p>Yell & Green Dress combination for kids</p>
                    <div className="">
                      <span className="pe-4">$78</span>
                      <button className=" btn btn-size">S</button>
                      <span className="ps-4">X 1</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="p-4  h-fit-content w-100">
              <div className="d-flex justify-content-between border-bottom pb-2">
                <div className="item1">Subtotal</div>
                <div className="item2">$10</div>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2">
                <div className="item1">Shipping</div>
                <div className="item2">$5</div>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2">
                <div className="item1">Grand Total</div>
                <div className="item2">$25</div>
              </div>
              <div className="d-flex  pt-3 ">
                <div className="col-7">
                  <span className="pe-5 ">
                    <input
                      type="radio"
                      onClick={(e) => {setPaymentMethod(e.target.value)}}
                      checked={paymentMethod == "stripe"}
                      value={"stripe"}
                    />
                    <label className="ps-2" htmlFor="stripe">
                      Stripe
                    </label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      onClick={(e) => {setPaymentMethod(e.target.value)}}
                      checked={paymentMethod == "COD"}
                      value={"COD"}
                    />
                    <label className="ps-2" htmlFor="">
                      CON
                    </label>
                  </span>
                </div>
                <div>
                  <Link to={"/checkout"}>
                    <button className="btn btn-primary">Checkout</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Checkout;
