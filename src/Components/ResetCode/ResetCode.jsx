import axios from 'axios';
import { useFormik } from 'formik';
import  { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  resetCode: yup.string().matches(/^[0-9]{6}$/, 'Code must be 6 numbers').required('Verification code is required'),
});

export default function ResetCode() {
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState('');
  const navigate = useNavigate();

  const codeVerification = async (resetcode) => {
    setLoading(true); // Set loading to true when starting the request
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', resetcode);
      if (response.data.statusMsg === 'success') { // Adjust based on API response structure
        setResponseError('');
        navigate('/createpass');
      } else {
        setResponseError('Verification failed');
      }
    } catch (error) {
      setResponseError(error.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  const verifyCode = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: (values) => {
      codeVerification(values);
    },
    validationSchema,
  });

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10'>
      <h3 className='text-2xl font-semibold text-center text-blue-600 mb-4'>Verification Code</h3>
      <form onSubmit={verifyCode.handleSubmit} className='space-y-4'>
        <div>
          <input
            type="text"
            id='resetCode'
            name='resetCode'
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={verifyCode.handleChange}
            onBlur={verifyCode.handleBlur}
            value={verifyCode.values.resetCode}
            placeholder='Enter the 6-digit code'
          />
          {verifyCode.errors.resetCode && verifyCode.touched.resetCode && (
            <p className='text-red-600 text-sm mt-1'>{verifyCode.errors.resetCode}</p>
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
              height="25"
              width="25"
              color="white"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          ) : (
            'Verify Code'
          )}
        </button>
      </form>
    </div>
  );
}
