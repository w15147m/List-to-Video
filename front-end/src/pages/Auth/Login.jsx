import React, { useContext } from 'react'
import CommonLayout from "../../layouts/CommonLayout";
import { useForm } from "react-hook-form"
import { loginPost } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await loginPost('/admin/login', data);
      localStorage.setItem('authInfo', JSON.stringify(response));
      login(response);
      toast.success("Login successful!");
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(error.message);
    }

  }

  return (
    <CommonLayout>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow border-0 log-in-card">
          <div className="card-body ">
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Email */}
              <div className='mb-3'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input
                  {...register("email", {
                    required: "The email field is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="text"
                  id="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder='Email'
                />
                {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className='mb-3'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input
                  {...register("password", {
                    required: "The password field is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters"
                    },

                  })}
                  type="password"
                  id="password"
                  placeholder='Password'
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <div>
                <button type="submit" className='btn btn-primary mt-2 me-auto'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </CommonLayout>
  )
}

export default Login
