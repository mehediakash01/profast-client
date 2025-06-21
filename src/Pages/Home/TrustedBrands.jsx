import Marquee from "react-fast-marquee";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import amazon from"../../assets/brands/amazon.png";
import casio from "../../assets/brands/casio.png"
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import start from "../../assets/brands/start.png";
import start_people from "../../assets/brands/start-people 1.png";

const logos = [amazon, amazon_vector, casio, moonstar, start,randstad,start_people];

const TrustedBrands = () => {
  return (
    <section className="w-11/12 mx-auto my-10 ">
      <div className="text-center text-white mb-6">
        <h2 className="text-3xl font-bold text-secondary">
          We’ve helped thousands of sales teams
        </h2>
      </div>

      <Marquee speed={60} pauseOnHover={true} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-10">
            <img
              src={logo}
              alt={`logo-${index}`}
              className="h-12 opacity-80 hover:opacity-100 transition duration-300 w-16 "
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default TrustedBrands;
