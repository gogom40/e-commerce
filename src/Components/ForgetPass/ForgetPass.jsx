import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
});

function ForgetPass() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [responseError, setResponseError] = React.useState('');

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post('https://your-api-url.com/api/v1/auth/forgotPasswords', values);
        console.log('API response:', response); // Log API response
        if (response.data.statusMsg === 'success') {
          setResponseError('');
          navigate('/verifyResetCode');
        }
      } catch (error) {
        console.error('Error submitting form:', error); // Log errors
        setResponseError(error.response?.data?.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='container mx-auto p-5'>
      <h3 className='text-2xl font-semibold mb-5 text-center text-blue-600'>Reset Password</h3>
      <form onSubmit={formik.handleSubmit} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <input
            type='email'
            id='email'
            name='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter your email'
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-red-600 text-sm mt-1'>{formik.errors.email}</p>
          )}
        </div>
        {responseError && <p className='text-red-600 text-sm mb-4'>{responseError}</p>}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {loading ? (
            <RotatingLines
              visible={true}
              height='25'
              width='25'
              color='white'
              strokeWidth='5'
              animationDuration='0.75'
              ariaLabel='rotating-lines-loading'
            />
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </div>
  );
}

export default ForgetPass;
