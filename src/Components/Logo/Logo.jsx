import React from 'react';
import icon from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex items-end '>
            <img className='lg:mb-1 w-8 h-8' src={icon} alt="" />
            <p className='font-semibold text-2xl lg:text-4xl ] '>Profast</p>
            
        </div>
    );
};

export default Logo;