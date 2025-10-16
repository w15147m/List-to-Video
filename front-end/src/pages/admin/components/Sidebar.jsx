import React, { useContext } from 'react'


import { Link } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="card shadow border-0 mb-3 ">
      <div className="card-body p-4">
        <ul>
          <li className='border-bottom py-3'>
            <Link to={'/admin/dashboard'} className="px-2">
              Dashboard
            </Link>
          </li>
          <li className='border-bottom py-3'>
            <Link to={'/admin/categories'} className="px-2">
              Categories
            </Link>
          </li>
          <li className='border-bottom py-3'>
            < Link to={'/admin/brands'} className="px-2">
              Brands
            </ Link>
          </li>
          <li className='border-bottom py-3'>
            < Link to={'/admin/products'} className="px-2">
              product
            </ Link>
          </li>
          <li className='border-bottom py-3'>
            < Link to={'/'} className="px-2">
              Users
            </ Link>
          </li>
          <li className='border-bottom py-3'>
            < Link to={'/'} className="px-2">
              Shipping
            </ Link>
          </li>
          <li className='border-bottom py-3'>
            < Link to={'/'} className="px-2">
              Change Password
            </ Link>
          </li>
          <li className='border-bottom py-3'>
            < Link onClick={logOut} className="px-2">
              Log Out
            </ Link>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default Sidebar