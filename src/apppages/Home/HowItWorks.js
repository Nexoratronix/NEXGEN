import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Nav,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";

//Process Images Import
import Image from "next/image";
import processImage1 from "../../assets/images/process-01.png";
import processImage2 from "../../assets/images/process-02.png";
import processImage3 from "../../assets/images/process-03.png";
import support from "../../assets/images/support.webp";


const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="section-title me-5">
                <h3 className="title myheading">How It Works</h3>
                <p className="text-muted">
                  Start with a simple registration, then let us deliver tailored IT staffing and solutions for your success.
                </p>
                <Nav className="process-menu flex-column nav-pills">
                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">1</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Tell Us Your Needs</h5>
                        <p className="text-muted mb-0">
                          We start by understanding your business goals, technical requirements, and team dynamics.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">2</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">We Match the Talent</h5>
                        <p className="text-muted mb-0">
                          Using our extensive network and advanced tools, we identify IT professionals who match your criteria.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">3</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Launch with Confidence</h5>
                        <p className="text-muted mb-0">
                          Enjoy seamless onboarding and ongoing support as your IT projects or staffing needs take off.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    href="#"
                    className={classnames({ active: activeTab === "4" })}
                    onClick={() => {
                      tabChange("4");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">4</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Support</h5>
                        <p className="text-muted mb-0">
                          Post-placement, we follow up href ensure satisfaction for both you and the candidate.
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </Nav>
              </div>
            </Col>
            <Col lg={6}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Image src={processImage1} alt="Tell Us Your Needs" className="img-fluid" />
                </TabPane>
                <TabPane tabId="2">
                  <Image src={processImage2} alt="We Match the Talent" className="img-fluid" />
                </TabPane>
                <TabPane tabId="3">
                  <Image src={processImage3} alt="Launch with Confidence" className="img-fluid" />
                </TabPane>
                <TabPane tabId="4">
                  <Image src={support} alt="Support" className="img-fluid" />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HowItWorks;
