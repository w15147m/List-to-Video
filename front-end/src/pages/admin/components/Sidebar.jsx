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
            <Link to={'/admin/playlist'} className="px-2">
              playlist
            </Link>
          </li>
      
        </ul>
      </div>
    </div>

  )
}

export default Sidebar