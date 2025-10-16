import React, { useEffect, useState } from 'react'
import CommonLayout from '@/layouts/CommonLayout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useForm } from 'react-hook-form'
import { post, put } from '@/services/apiServices'
import { toast } from 'react-toastify'
import BtnLoader from '@/components/BtnLoader'

const Form = () => {
  const [isLoader, setLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category || null;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
      setValue('status', category.status ? '1' : '0');
    }
  }, [category, setValue]);


  const saveData = async (data) => {
    setLoader(true);
    try {
      if (category) {
        const result = await put(`/categories/${category.id}`, data);
        toast.success(result.message || 'Category updated successfully');
      } else {
        const result = await post('/categories', data);
        toast.success(result.message || 'Category created successfully');
      }
      navigate('/admin/categories');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoader(false);
    }
  };

  return (
    <CommonLayout>
      <div className="container">
        <div className='d-flex justify-content-between mb-3 pd-r-px-24'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/categories/">Categories</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Create
              </li>
            </ol>
          </nav>
          <Link to='/admin/categories' className="btn btn-primary">Back</Link>
        </div>

        <div className="row">
          <div className="col-md-3 checkbox-cards">
            <Sidebar />
          </div>

          <div className="col-md-9 row">
            <div className="col-md-12 checkbox-cards">
              <form onSubmit={handleSubmit(saveData)}>
                <div className="card shadow border-0 mb-3">
                  <div className="card-body p-4">
                    {/* Name Field */}
                    <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder='Enter category name'
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name.message}</div>
                      )}
                    </div>

                    {/* Status Field */}
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                        defaultValue=""
                        {...register('status', { required: 'Status is required' })}
                      >
                        <option value="" disabled>Select a status</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                      {errors.status && (
                        <div className="invalid-feedback">{errors.status.message}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex'>
                  {
                    isLoader ? <BtnLoader /> : <button type='submit' className='btn btn-primary '>Create</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}

export default Form
