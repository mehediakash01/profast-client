import React from 'react';
import icon from '../../assets/logo.png'
const Logo = () => {
    return (
        <div className='flex items-end '>
            <img className='mb-1' src={icon} alt="" />
            <p className='font-semibold text-4xl ] '>Profast</p>
            
        </div>
    );
};

export default Logo;