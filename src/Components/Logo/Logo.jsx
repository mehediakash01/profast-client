import React from 'react';
import icon from '../../assets/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to={'/'} className='flex items-end '>
            <img className='lg:mb-1 w-8 h-8' src={icon} alt="" />
            <p className='font-semibold text-2xl lg:text-4xl ] '>Profast</p>
            
        </Link>
    );
};

export default Logo;