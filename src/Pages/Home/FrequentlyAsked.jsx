import React from "react";
import Container from "../../Components/reuseAble/Container";


const FrequentlyAsked = () => {
  return (
    <Container>
      <div className="my-12">
        <div className="my-5 space-y-2 text-center">
          <h1 className="font-extrabold text-4xl text-secondary">
            Frequently Asked Question (FAQ)
          </h1>
          <p>
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        <div className="space-y-2">
            <div className="collapse collapse-arrow bg-[#E6F2F3] text-secondary">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title font-semibold">
                How do I send a parcel using your service?
              </div>
              <div className="collapse-content text-sm">
                You can book a delivery by filling out a form online. Our rider will
                pick it up from your location.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#E6F2F3] text-secondary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Do you deliver all over Bangladesh?
              </div>
              <div className="collapse-content text-sm">
                Yes, we offer delivery services across the entire country, including
                remote areas.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#E6F2F3] text-secondary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                How long does delivery take?
              </div>
              <div className="collapse-content text-sm">
                Inside city: 1–2 working days Outside <br />
                city: 2–4 working days
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#E6F2F3] text-secondary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                Can I track my parcel?
              </div>
              <div className="collapse-content text-sm">
                Yes, after booking you’ll receive a tracking ID to check real-time
                parcel status.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#E6F2F3] text-secondary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                What types of parcels can I send?
              </div>
              <div className="collapse-content text-sm">
                You can send documents, packages, electronics, clothing, and
                more—excluding prohibited or illegal items.
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#E6F2F3] text-secondary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">
                What if my parcel gets lost or damaged?
              </div>
              <div className="collapse-content text-sm">
                We take full responsibility for lost or damaged parcels. You may be
                eligible for compensation based on our terms
              </div>
            </div>
        </div>
      </div>
    </Container>
  );
};

export default FrequentlyAsked;
