import React from 'react'
import logo from "../assets/images/logo.png";

import { MoneyBackIcon, SecurePaymentIcon, TruckIcon } from '../assets/SVGs/footerSvg'

const Footer = () => {
  return (
     <footer >
        <div className="container">
          <div className="row p-5 pb-3">
            <div className="col-md-3">
              {/* style={{ height: "40px" }} */}
              <img
                src={logo}
                alt=""
                className="h-px-40 bg-body-secondary rounded mb-3"
              />
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="col-md-3">
              <h3 className="mb-4">categories</h3>
              <ul>
                <li>Men</li>
                <li>Women</li>
                <li>Ked</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3 className="mb-4">Quick Links</h3>
              <ul>
                <li>Log In</li>
                <li>SignUp</li>
              </ul>
            </div>{" "}
            <div className="col-md-3">
              <h3 className="mb-4">Get In touch</h3>
              <ul>
                <li>+92**********</li>
                <li>hamzataskly@mail.com</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="row my-5 text-white">
            <div className="col-md-4 d-flex justify-content-center item1">
              <TruckIcon />
              <h3 className="px-2">Free delivery</h3>
            </div>
            <div className="col-md-4 d-flex justify-content-center item2">
              <MoneyBackIcon />
              <h3 className="px-2">Money Back Guarantee</h3>
            </div>
            <div className="col-md-4 d-flex justify-content-center item3">
              <SecurePaymentIcon />
              <h3 className="px-2">secure payments</h3>
            </div>
          </div>
          <hr />
             <div className="row text-center text-white">
              <p>&copy; Pre-wear.com </p>
             </div>
        </div>
      </footer>
  )
}

export default Footer