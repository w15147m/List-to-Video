import React from 'react'

const BtnLoader = () => {
  return (
   <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
  <span>  Loading...</span>
</button>
  )
}

export default BtnLoader