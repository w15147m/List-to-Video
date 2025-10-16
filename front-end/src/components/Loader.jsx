import React from 'react'

const Loader = () => {
  return (
    <div className='text-center d-flex justify-content-center align-items-lg-center'>
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loader