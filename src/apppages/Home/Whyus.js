import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WhyChooseUs() {
  const [textColor, setTextColor] = useState("text-black");

  return (
    <div className="container py-5">
      <div className="bg-light text-black p-5 rounded shadow-md text-center">
        <h2
          className={`display-5 fw-bold myheading mb-4 ${textColor}`}
          onMouseEnter={() => setTextColor("text-black")}
          onMouseLeave={() => setTextColor("text-black")}
        >
          Why Choose Us for IT Staffing?
        </h2>
        <p className="lead">
          The demand for skilled IT professionals in the US is at an all-time high, with industries ranging from healthcare href finance relying on technology href stay competitive. At <span className="fw-semibold text-warning">NEXGEN Staffing</span>, we take a proactive approach href IT recruitment, ensuring that you have access href the best tech talent when you need it most.
        </p>
        <div className="mt-4 text-start text-black">
          {[
            {
              title: "Expert IT Recruitment:",
              description: "With years of experience in the US tech staffing market, we know what it takes href identify and place top IT talent."
            },
            {
              title: "Customized Solutions:",
              description: "From temporary IT hires href permanent placements, we adapt our services href meet your unique business needs."
            },
            {
              title: "Nationwide Reach:",
              description: "Operating across the US, we connect you with IT professionals from coast href coast, ensuring no opportunity is missed."
            },
            {
              title: "Fast Turnaround:",
              description: "Our streamlined hiring process ensures you can onboard IT candidates quickly without compromising quality."
            }
          ].map((item, index) => (
            <div key={index} className="d-flex align-items-center gap-3 text-black mb-3">
              <FontAwesomeIcon icon={faCheckCircle} className="text-primary fs-4" />
              <p className="m-0">
                <span className="fw-bold text-black">{item.title}</span>
                <span className="text-black"> {item.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}