import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    title: "Residential Rentals",
    icon: "bi-calender-check",
    description:
      "Find your dream home from our wide range of verified apartments, houses, and shared accommodations.",
    link: "#",
  },
  {
    title: "Commercial Space Rentals",
    icon: "bi-person-lines-fill",
    description:
      "Secure the best commercial spaces for offices, retail shops, and business hubs in prime locations.",
    link: "#",
  },
  {
    title: "Property Consultation",
    icon: "bi-people-fill", // Icon for on-site management
    description:
      "Get expert advice on selecting the right rental property, understanding lease terms, and budgeting effectively.",
    link: "#",
  },
  {
    title: "Verified Listings & Secure Transactions",
    icon: "bi-bullhorn", // Icon for marketing and promotion
    description:
      "Rent with confidence! All properties undergo strict verification to ensure secure and hassle-free transactions.",
    link: "#",
  },
  {
    title: "Tenant & Landlord Assistance",
    icon: "bi-display", // Icon for technical support
    description:
      "We assist tenants in finding the right space and help landlords connect with reliable renters.",
    link: "#",
  },
  {
    title: "Rental Agreement & Documentation Support",
    icon: "bi-file-earmark-check", // Icon for post-event services
    description:
      "Simplify the rental process with legally verified agreements and seamless paperwork assistance.",
    link: "#",
  },
];

const ServiceCard = ({ title, icon, description, link, delay }) => {
  return (
    <div className="col-lg-6" data-aos="fade-up" data-aos-delay={delay}>
      <div className="service-item item-cyan position-relative">
        <i className={`bi ${icon} icon`}></i>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
          <a href={link} className="read-more stretched-link">
            Learn More <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  
  useEffect(() => {
    window.scrollTo(0,0);
    AOS.init({
      delay: 0,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <>
      <style>
        {`
     .services { 
            padding: 80px 0;
            transition:none; 
          } 
 
          .services .section-title h2 { 
            font-size: 36px; 
            font-weight: bold; 
            color: #333; 
            margin-bottom: 20px; 
            text-align: center; 
            position: relative; 
          } 
 
          .services .section-title p { 
            font-size: 18px; 
            color: #555; 
            text-align: center; 
            max-width: 800px; 
            margin: 0 auto 50px; 
          } 
 
          .service-item { 
            background-color: #fff; 
            border-radius: 10px; 
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); 
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
            padding: 30px; 
            position: relative; 
             display: flex; 
            align-items: center; 
            justify-content: flex-start; 
            overflow: hidden; 
          } 
 
          .service-item .icon { 
            font-size: 50px; 
            color: #00bfae; 
            margin-right: 20px; 
            transition: transform 0.3s ease; 
          } 
 
          .service-item:hover { 
            transform: translateY(-10px); 
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); 
          } 
 
          .service-item:hover .icon { 
            transform: scale(1.1); 
          } 
 
          .service-item h3 { 
            font-size: 24px; 
            font-weight: bold; 
            color: #333; 
            margin-bottom: 15px; 
          } 
 
          .service-item p { 
            font-size: 16px; 
            color: #777; 
            margin-bottom: 20px; 
          } 
 
          .service-item .read-more { 
            font-size: 16px; 
            color: #00bfae; 
            font-weight: 600; 
            text-decoration: none; 
            display: inline-flex; 
            align-items: center; 
          } 
 
          .service-item .read-more i { 
            margin-left: 10px; 
             font-size: 14px; 
          } 
 
          /* Hover Effect for Read More Link */ 
          .service-item .read-more:hover { 
            color: #008f7e; 
            text-decoration: underline; 
          } 
 
          /* Responsive Design */ 
          @media (max-width: 768px) { 
            .services .section-title h2 { 
              font-size: 28px; 
            } 
 
            .services .section-title p { 
              font-size: 16px; 
            } 
 
            .service-item { 
              padding: 20px; 
              text-align: center; 
            } 
 
            .service-item .icon { 
              font-size: 40px; 
              margin-bottom: 20px; 
            } 
 
            .service-item h3 { 
              font-size: 20px; 
            } 
 
            .service-item p { 
              font-size: 14px; 
            } 
 
            .service-item .read-more { 
              font-size: 14px; 
            } 
          } 
    `}
      </style>

      <section
        id="services"
        className="services section light-background"
        style={{
          backgroundImage:
            "linear-gradient(#F4F8D3,rgba(255, 249, 91,0.1),rgba(255, 147, 15,0.1))",
        }}
      >
        <div className="container section-title">
          <h2>Find Your Ideal Rental Property with LetMySpace</h2>
          <p>
            Discover the perfect space for your home or business with our expert
            rental solutions.
          </p>
        </div>
        <div className="container">
          <div className="row g-5">
            {services.map((services, index) => (
              <ServiceCard
                key={index}
                title={services.title}
                icon={services.icon}
                description={services.description}
                link={services.link}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
