import React from 'react';
import errorImg from '../../assets/error.png'
import { Link } from 'react-router';
const ErrorPage = () => {
    return (
        <div className='w-11/12 mx-auto mt-12'>
            <div className='flex flex-col items-center justify-center'>
                <img src={errorImg} alt="" />
                <Link to={'/'}><button className='btn btn-primary text-black'>Go Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;