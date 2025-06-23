import React from 'react';
import location from '../../assets/location-merchant.png'
import merchantBg from '../../assets/be-a-merchant-bg.png';
import Container from '../../../reuseAble/Container';
const Marchent = () => {
    return (
        <Container>
            <div className="lg:flex justify-around items-center bg-secondary p-20  my-12 rounded-4xl  "   style={{ backgroundImage: `url(${merchantBg})`,  backgroundRepeat:'no-repeat', objectFit:'contain' }}>
                <div className='space-y-2'>
                    <h1 className='text-4xl font-extrabold text-white'>Merchant and Customer Satisfaction <br /> is Our First Priority</h1>
                    <p className='opacity-60 text-white'>We offer the lowest delivery charge with the highest value along with <br /> 100% safety of your product. Pathao courier delivers your parcels in every <br /> corner of Bangladesh right on time.</p>
                    <span className='space-x-2'><button className='btn btn-primary text-black rounded-full'>  Become a Merchant</button > <button className='  rounded-full border-1 p-2 border-primary text-primary'>Earn with Profast Courier</button></span>
                </div>
                <div>
                    <img src={location} alt="" />
                </div>
            
            </div>
        </Container>
    );
};

export default Marchent;