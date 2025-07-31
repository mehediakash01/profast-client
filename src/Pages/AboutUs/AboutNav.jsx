import React from 'react';
import { Link } from 'react-router';

const AboutNav = () => {
    return (
        <div>
                 <ul className='flex gap-2 my-12'>
               <Link to={'/aboutUs'}>story</Link>
               <Link to={'/aboutUs/mission'}>mission</Link>
               <Link to={'/aboutUs/success'}>success</Link>
               <Link>team & others</Link>
              </ul>

        </div>
    );
};

export default AboutNav;