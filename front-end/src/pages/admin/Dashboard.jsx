import CommonLayout from '../../layouts/CommonLayout'
import FeaturedProducts from '../../components/FeaturedProducts'
import { Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'

const Dashboard = () => {
  return (
    <CommonLayout>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
          </ol>
        </nav>
        <div className="row ">
          <div className="col-md-3 checkbox-cards ">
            <Sidebar/>
          </div>
          <div className="col-md-9 row flex-wrap">
            <div className="col-md-4 checkbox-cards">
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
            <div className="col-md-4 checkbox-cards">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h1>1</h1>
                  <h5>Users</h5>
                </div>
                <div className='card-footer py-2 px-4 m-0'>
                  <span>View Users</span>
                </div>
              </div>
            </div><div className="col-md-4 checkbox-cards">
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

export default Dashboard