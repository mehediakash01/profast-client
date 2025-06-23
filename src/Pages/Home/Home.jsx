import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import TrustedBrands from './TrustedBrands';
import ServiceHighlights from './ServiceHighlights';
import Marchent from './Marchent';
import FrequentlyAsked from './FrequentlyAsked';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWorks></HowItWorks>
          <OurServices></OurServices>
          <TrustedBrands></TrustedBrands>
          <ServiceHighlights></ServiceHighlights>
          <Marchent></Marchent>
          <FrequentlyAsked></FrequentlyAsked>
        </div>
    );
};

export default Home;