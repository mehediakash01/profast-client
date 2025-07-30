import React from 'react';
import { Link } from 'react-router';

const AboutNav = () => {
    return (
        <div>
                 <ul className='flex gap-2 my-12'>
               <Link to={'/aboutUs'}>story</Link>
               <Link>mission</Link>
               <Link>success</Link>
               <Link>team & others</Link>
              </ul>

        </div>
    );
};

export default AboutNav;