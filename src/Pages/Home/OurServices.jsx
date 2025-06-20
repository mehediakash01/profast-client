import {
  FiTruck,
  FiGlobe,
  FiSettings,
  FiDollarSign,
  FiBriefcase,
  FiRotateCw,
} from "react-icons/fi";

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi...",
    icon: <FiTruck className="text-4xl mb-4" />,
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery...",
    icon: <FiGlobe className="text-4xl mb-4" />,
 
  },
  {
    title: "Fulfillment Solution",
    desc: "Customized service with inventory management support...",
    icon: <FiSettings className="text-4xl mb-4" />,
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash on delivery anywhere in Bangladesh...",
    icon: <FiDollarSign className="text-4xl mb-4" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Corporate services including warehouse and inventory support.",
    icon: <FiBriefcase className="text-4xl mb-4" />,
  },
  {
    title: "Parcel Return",
    desc: "Allow end customers to return or exchange products...",
    icon: <FiRotateCw className="text-4xl mb-4" />,
  },
];

const OurServices = () => {
  return (
    <section className="w-11/12 mx-auto rounded-4xl my-12 bg-secondary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Our Services</h2>
        <p className="text-gray-200 mb-10 max-w-2xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={
                "rounded-xl p-6 shadow-md transition duration-300 text-center bg-white hover:bg-primary"
              }
            >
              <p className="flex justify-center">{service.icon}</p>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
