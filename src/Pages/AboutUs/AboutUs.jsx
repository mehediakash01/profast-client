import React from 'react';


const AboutUs = () => {
    return (
        <div className='w-11/12 mx-auto my-12'>
            <h1 className='text-secondary text-5xl font-extrabold'>About Us</h1>
            <p>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.</p>
              <div className="divider"></div>
              <ul className='flex gap-2 my-12'>
                <li>story</li>
                <li>mission</li>
                <li>success</li>
                <li>team & others</li>
              </ul>

            
        </div>
    );
};

export default AboutUs;