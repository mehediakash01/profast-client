import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import TrustedBrands from './TrustedBrands';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWorks></HowItWorks>
          <OurServices></OurServices>
          <TrustedBrands></TrustedBrands>
        </div>
    );
};

export default Home;