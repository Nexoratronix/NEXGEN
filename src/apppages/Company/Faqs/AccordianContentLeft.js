import React, { useState } from "react";
import { Collapse } from "reactstrap";

const AccordianContentLeft = () => {
  const [isCollapseFirst, setIsCollapseFirst] = useState(true);
  const toggleFirst = () => setIsCollapseFirst(!isCollapseFirst);

  const [isCollapseSecond, setIsCollapseSecond] = useState(false);
  const toggleSecond = () => setIsCollapseSecond(!isCollapseSecond);

  const [isCollapseThird, setIsCollapseThird] = useState(false);
  const toggleThird = () => setIsCollapseThird(!isCollapseThird);

  return (
    <React.Fragment>
      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="buyingone">
          <button
            className="accordion-button"
            onClick={toggleFirst}
            type="button"
          >
            What types of IT professionals can you provide through your staffing solutions?
          </button>
        </h2>
        <Collapse isOpen={isCollapseFirst} id="buying-one">
          <div className="accordion-body">
          We source a wide range of highly skilled IT professionals, including developers, software engineers, data analysts, cybersecurity experts, and network administrators. Whether you need short-term support or long-term talent, we match you with professionals who fit your project’s specific requirements.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="buyingtwo">
          <button
            className="accordion-button"
            onClick={toggleSecond}
            type="button"
          >
           How does your custom software development process work?
          </button>
        </h2>
        <Collapse isOpen={isCollapseSecond} id="buying-two">
          <div className="accordion-body">
          Our process starts with understanding your business goals and technical needs. From there, we design, develop, and test a tailored solution—be it a mobile app, web platform, or enterprise system. We prioritize collaboration, regular updates, and quality assurance href deliver innovative software on time and within budget.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="buyingthree">
          <button
            className="accordion-button"
            onClick={toggleThird}
            type="button"
          >
            What’s included in your managed IT services?
          </button>
        </h2>
        <Collapse isOpen={isCollapseThird} id="buying-three">
          <div className="accordion-body">
          Our managed IT services cover everything from proactive network monitoring and maintenance href helpdesk support and system upgrades. We ensure your IT infrastructure runs smoothly, minimizing downtime and letting you focus on your core business while we handle the tech.
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default AccordianContentLeft;
