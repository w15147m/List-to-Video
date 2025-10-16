import React from "react";
import CommonLayout from "../layouts/CommonLayout";
import { Link } from "react-router-dom";
import sixMen from "../assets/images/Mens/six.jpg";
import { TrashIcon } from "../assets/SVGs/commonSVJs.jsx";

const Cart = () => {
  return (
    <CommonLayout>
      <div className="container cart-page">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              cart
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-9">
          <h3 className=" col-md-12">Cart</h3>
          <hr />
            <table className="table ">
              <tbody>
                <tr>
                  <td valign="middle" width={80}>
                    <img src={sixMen} width={80} alt="" />
                  </td>
                  <td valign="middle" width={400}>
                    <p>Yell & Green Dress combination for kids</p>
                    <p className="">
                      $78
                      <span className="text-muted text-decoration-line-through mx-1">
                        $80
                      </span>
                    </p>
                    <button className="btn btn-size">S</button>
                  </td>
                  <td valign="middle" width={100}>
                    <input type="number" value={1} className="form-control" />
                  </td>
                  <td valign="middle" className="text-center">
                    <TrashIcon />
                  </td>
                </tr>
                <tr>
                  <td valign="middle" width={80}>
                    <img src={sixMen} width={80} alt="" />
                  </td>
                  <td valign="middle" width={400}>
                    <p>Yell & Green Dress combination for kids</p>
                    <p className="">
                      $78
                      <span className="text-muted text-decoration-line-through mx-1">
                        $80
                      </span>
                    </p>
                    <button className="btn btn-size">S</button>
                  </td>
                  <td valign="middle" width={100}>
                    <input type="number" value={1} className="form-control" />
                  </td>
                  <td valign="middle" className="text-center">
                    <TrashIcon />
                  </td>
                </tr>
                <tr>
                  <td valign="middle" width={80}>
                    <img src={sixMen} width={80} alt="" />
                  </td>
                  <td valign="middle" width={400}>
                    <p>Yell & Green Dress combination for kids</p>
                    <p className="">
                      $78
                      <span className="text-muted text-decoration-line-through mx-1">
                        $80
                      </span>
                    </p>
                    <button className="btn btn-size">S</button>
                  </td>
                  <td valign="middle" width={100}>
                    <input type="number" value={1} className="form-control" />
                  </td>
                  <td valign="middle" className="text-center">
                    <TrashIcon />
                  </td>
                </tr>
                <tr>
                  <td valign="middle" width={80}>
                    <img src={sixMen} width={80} alt="" />
                  </td>
                  <td valign="middle" width={400}>
                    <p>Yell & Green Dress combination for kids</p>
                    <p className="">
                      $78
                      <span className="text-muted text-decoration-line-through mx-1">
                        $80
                      </span>
                    </p>
                    <button className="btn btn-size">S</button>
                  </td>
                  <td valign="middle" width={100}>
                    <input type="number" value={1} className="form-control" />
                  </td>
                  <td valign="middle" className="text-center">
                    <TrashIcon />
                  </td>
                </tr>
                <tr>
                  <td valign="middle" width={80}>
                    <img src={sixMen} width={80} alt="" />
                  </td>
                  <td valign="middle" width={400}>
                    <p>Yell & Green Dress combination for kids</p>
                    <p className="">
                      $78
                      <span className="text-muted text-decoration-line-through mx-1">
                        $80
                      </span>
                    </p>
                    <button className="btn btn-size">S</button>
                  </td>
                  <td valign="middle" width={100}>
                    <input type="number" value={1} className="form-control" />
                  </td>
                  <td valign="middle" className="text-center">
                    <TrashIcon />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" col-md-3  ">
            <div className="p-4 card h-fit-content w-100">
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
              <div className="d-flex justify-content-end pt-3 ">
                <Link to={'/checkout'}>
                <button className="btn btn-primary">Proceed To Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Cart;
