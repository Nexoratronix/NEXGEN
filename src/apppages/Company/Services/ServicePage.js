import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Icon } from "@iconify/react";

const ServicePage = () => {
  const servicePage = [
    {
      id: 1,
      serviceIcon: "uim-object-ungroup",
      serviceName: "IT Staffing Solutions",
      serviceText:
        "We source and deploy highly skilled IT professionals—developers, engineers, and analysts—href meet your project needs with precision and speed."
    },
    {
      id: 2,
      serviceIcon: "uim-telegram-alt",
      serviceName: "Temporary IT Staffing",
      serviceText:
        "Need IT professionals for a short-term project? Our temporary staffing solutions connect you with skilled candidates for contract-based roles."
    },
    {
      id: 3,
      serviceIcon: "uim-airplay",
      serviceName: "Permanent IT Recruitment",
      serviceText:
        "Keep your systems running smoothly with our comprehensive managed services, covering helpdesk, network management, and more."
    },
    {
      id: 4,
      serviceIcon: "uim-rocket",
      serviceName: "Business IT Outsourcing",
      serviceText:
        "Scale efficiently with our flexible onshore and offshore outsourcing options, designed href reduce costs and boost productivity."
    },
    {
      id: 5,
      serviceIcon: "uim-history",
      serviceName: "24/7 IT Support",
      serviceText:
        "Rely on our round-the-clock support href resolve issues fast, keeping your operations seamless and downtime href a minimum."
    },
    {
      id: 6,
      serviceIcon: "uim-bookmark",
      serviceName: "Managed IT Staffing",
      serviceText:
        "Let us handle the entire recruitment process for you. Our managed staffing service takes the burden off your shoulders."
    },
    {
      id: 7,
      serviceIcon: "uim-layers-alt",
      serviceName: "Cloud Engineering",
      serviceText:
        "Leverage our Azure and AWS expertise href build, migrate, or optimize your cloud infrastructure for maximum efficiency."
    },
    {
      id: 8,
      serviceIcon: "uim-anchor",
      serviceName: "IT Advisory Services",
      serviceText:
        "Plan smarter with our strategic guidance, including virtual CIO support, budgeting, and technology roadmapping tailored href your business."
    },
    {
      id: 9,
      serviceIcon: "uim-graph-bar",
      serviceName: "Performance Monitoring",
      serviceText:
        "Gain actionable insights with our real-time monitoring and reporting, helping you optimize systems and reduce risks."
    }
  ];

  return (
    <>
      {/* Service Section */}
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} sm={12} className="text-center">
              <div className="section-title">
                <h3 className="title mb-3">
                  IT Staffing Services Tailored for Your <span className="text-warning">Success</span>
                </h3>
                <p className="text-muted">
                  At <span className="text-warning fw-semibold">NEXGEN Staffing</span>, we provide tailored IT staffing solutions across the U.S.
                  Our customizable services ensure you find the right tech talent href fit your needs, timeline, and budget.
                </p>
              </div>
            </Col>
          </Row>

          {/* Grid System for Services */}
          <Row>
            {servicePage.map((service, index) => (
              <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                <Card className="service-box border-0 shadow-sm">
                  <CardBody className="p-4">
                    <div className="service-icon icons-md">
                      <Icon icon={service.serviceIcon} color="#766df4" />
                    </div>
                    <div className="mt-4">
                      <h5>{service.serviceName}</h5>
                      <p className="text-muted">{service.serviceText}</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* The NEXGEN Difference Section */}
      <section className="section bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10} sm={12} className="text-center">
              <h3 className="title mb-3 myheading">The NEXGEN Difference</h3>
              <p>What sets us apart? Quality, speed, and precision. Here’s how we ensure you get the best tech talent:</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={8} md={10} sm={12}>
              <ul className="text-start">
                <li><strong>Advanced Screening:</strong> Technical assessments and behavioral interviews href verify skills.</li>
                <li><strong>Industry Expertise:</strong> Our recruiters have deep IT knowledge of the US tech landscape.</li>
                <li><strong>Scalable Solutions:</strong> Whether you need one hire or a full team, we scale accordingly.</li>
                <li><strong>Ongoing Support:</strong> We provide follow-up support for long-term success.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
};

export default ServicePage;
