import React, { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import TrustedBrands from './TrustedBrands';
import ServiceHighlights from './ServiceHighlights';
import Marchent from './Marchent';
import FrequentlyAsked from './FrequentlyAsked';
import CustomerReviews from './CustomerReviews';
import useTitle from '../../Hooks/useTitle';

const Home = () => {
  useTitle("Home");
  const [reviewData,setReviewData]=useState([]);
  useEffect(()=>{
   fetch('/reviews.json').then(res=>res.json()).then(data=>setReviewData(data));
  },[])
    return (
        <div>
          <Banner></Banner>
          <HowItWorks></HowItWorks>
          <OurServices></OurServices>
          <TrustedBrands></TrustedBrands>
          <ServiceHighlights></ServiceHighlights>
          <Marchent></Marchent>
          <CustomerReviews reviewData={reviewData} />
          <FrequentlyAsked></FrequentlyAsked>
        </div>
    );
};

export default Home;