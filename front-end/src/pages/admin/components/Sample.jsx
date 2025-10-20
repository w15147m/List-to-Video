import React from 'react'
import CommonLayout from '@/layouts/CommonLayout'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Sample = () => {
  return (
    <CommonLayout>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Categories</Link>
            </li>
          </ol>
        </nav>
        <div className="row ">
          <div className="col-md-3 checkbox-cards ">
            <Sidebar />
          </div>
          <div className="col-md-9 row">
            <div className="col-md-12 checkbox-cards">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h1>1</h1>
                  <h5>Users</h5>
                </div>
                <div className='card-footer py-2 px-4 m-0'>
                  <span>View Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout >
  )
}

export default Sample