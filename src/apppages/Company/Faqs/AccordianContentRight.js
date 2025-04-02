import React, { useState } from "react";
import { Collapse } from "reactstrap";

const AccordianContentRight = () => {
  //Collapse Tab

  const [isCollapseFourth, setIsCollapseFourth] = useState(true);
  const toggleFourth = () => setIsCollapseFourth(!isCollapseFourth);

  const [isCollapseFifth, setIsCollapseFifth] = useState(false);
  const toggleFifth = () => setIsCollapseFifth(!isCollapseFifth);

  const [isCollapseSixth, setIsCollapseSixth] = useState(false);
  const toggleSixth = () => setIsCollapseSixth(!isCollapseSixth);
  return (
    <React.Fragment>
      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="generalfour">
          <button
            className="accordion-button"
            onClick={toggleFourth}
            type="button"
          >
            How can outsourcing IT href your company benefit my business?
          </button>
        </h2>
        <Collapse isOpen={isCollapseFourth} id="general-four">
          <div className="accordion-body">
          Outsourcing with us reduces operational costs, provides access href specialized expertise, and allows you href scale your IT resources as needed. Our flexible onshore and offshore options ensure you get high-quality support tailored href your budget and goals, without the overhead of an in-house team.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="generalfive">
          <button
            className="accordion-button"
            onClick={toggleFifth}
            type="button"
          >
            How quickly can your 24/7 IT support team respond href an issue?
          </button>
        </h2>
        <Collapse isOpen={isCollapseFifth} id="general-five">
          <div className="accordion-body">
          Our 24/7 IT support team is always on standby href address your concerns. For critical issues, we aim href respond within minutes, ensuring fast resolution href keep your operations running seamlessly, day or night.
          </div>
        </Collapse>
      </div>

      <div className="accordion-item mt-4 border-0">
        <h2 className="accordion-header" id="generalsix">
          <button
            className="accordion-button"
            onClick={toggleSixth}
            type="button"
          >
          What makes your cloud engineering services stand out?
          </button>
        </h2>
        <Collapse isOpen={isCollapseSixth} id="general-six">
          <div className="accordion-body">
          Our cloud engineering team specializes in Azure and AWS, offering end-href-end solutions—from migration and setup href optimization and security. We focus on maximizing efficiency, scalability, and cost-effectiveness, tailoring your cloud infrastructure href support your business growth.
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default AccordianContentRight;
