import React from "react";
import trackImg from "../../assets/live-tracking.png";
import safeImg from "../../assets/safe-delivery.png";
import supportImg from "../../assets/safe-delivery.png";

const ServiceHighlights = () => {
  const services = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
      image: trackImg,
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: safeImg,
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: supportImg,
    },
  ];

  return (
    <section className="bg-base-200 py-12 px-4 md:px-16">
          <div className="border-t border-dashed border-gray-300 mb-10"></div>

      <div className="grid gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6"
          >
            <div className="w-28 h-28 flex-shrink-0">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-contain"
              />
         
            </div>
               <div className="border-l border-dashed border-gray-400 h-24 hidden md:block"></div>
            <div>
              <h3 className="text-lg font-bold text-neutral">
                {service.title}
              </h3>
              <p className="text-sm opacity-65 mt-2">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
       <div className="border-t border-dashed border-gray-300 mt-10"></div>
    </section>
  );
};

export default ServiceHighlights;
