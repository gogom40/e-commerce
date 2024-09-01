import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as Yub from 'yup'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';
export default function Register() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  let {setUserData}= useContext(UserContext)
  const navigte = useNavigate()
  async function handelRegister(values) {
    try {
      setLoading(true)
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` ,values);
    console.log(data);
    localStorage.setItem('userToken' ,data.token);
    navigte('/')
    setUserData(data.token)
    setLoading(false)
  } catch (error) {
      console.log(error.response.data.message);
      setApiError(error.response.data.message);
      setLoading(false)
    }
  }

  // function validForm(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = 'Name is required';
  //   } else if (!/^[A-Z][a-z]{3,10}$/.test(values.name)) {
  //     errors.name = 'Name must be 3-10 characters long and start with a capital letter';
  //   }
  //   if (!values.email) {
  //     errors.email = 'Email is required';
  //   }
  //   if(!values.phone){
  //     errors.phone = 'Phone number is required'
  //   }else if(!/^(002)01[0125][0-9]{8}$/.test(value.phone)){
  //     errors.phone = 'Invalid phone number'
  //   }
  //   return errors;
  // }
let validationSchema= Yub.object().shape({
  name: Yub.string().min(3,'min lenghth is 3').max(10,'max 10').required('Name is required'),
  email: Yub.string().email('Invalid email').required('Email is required'),
  password:Yub.string().matches(/^[A-Z]\w{5,10}$/,'Password Invalid').required('Password is required ex(Ahmed123)'),
  rePassword: Yub.string().oneOf([Yub.ref('password')], 'Password and confirmation must match').required('Password confirmation is required'),
  phone: Yub.string().matches(/^01[0125][0-9]{8}$/,'must be eg').required('Phone number is required')
})
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handelRegister
  });

  return (
    <>
      <div className="pt-8 w-1/2 mx-auto">
        <h2 className="text-3xl py-6 font-semibold">Register Now</h2>
        <form onSubmit={formik.handleSubmit} className="">
       {apiError&&
       <div className="text-red-600 text-sm">{apiError}</div>
       }
              
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
            {formik.errors.name && formik.touched.name&& (
              <div className="text-red-600 text-sm ">{formik.errors.name}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {formik.errors.email &&formik.touched.email && (
              <div className="text-red-600 text-sm ">{formik.errors.email}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Password
            </label>
            {formik.errors.password &&formik.touched.password && (
              <div className="text-red-600 text-sm ">{formik.errors.password}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your rePassword
            </label>
            {formik.errors.rePassword &&formik.touched.rePassword && (
              <div className="text-red-600 text-sm ">{formik.errors.rePassword}</div>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your phone
            </label>
            {formik.errors.phone &&formik.touched.phone && (
              <div className="text-red-600 text-sm ">{formik.errors.phone}</div>
            )}
          </div>

         
          {loading?  <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>: <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>}
        
        </form>
      </div>
    </>
  );
}
