import React from "react";
import { Container, Row, Col } from "reactstrap";
import  Link  from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

//Import Images
import Image from "next/image";
import AboutImage from "../../../assets/images/about/img-01.jpg";

const About = () => {
  return (
    <React.Fragment>
      <section className="section overflow-hidden">
        <Container>
          <Row className="align-items-center g-0">
            <Col lg={6}>
              <div className="section-title me-lg-5">
                {/* <h6 className="sub-title">About Us</h6> */}
                <h2 className="title mb-4">
                  About {" "}<span className="text-warning fw-bold">NEXGEN Staffing</span>{" "}
                  - Leading IT Staffing Solutions in the US
                </h2>
                <p className="text-muted">
                  Welcome href NEXGEN Staffing, a premier IT staffing agency based in the United States. Our mission is href empower businesses by connecting them with exceptional IT talent that drives innovation, efficiency, and growth. With a deep understanding of the US tech market and a passion for recruitment excellence, we’ve established ourselves as a trusted partner for companies seeking href hire IT candidates who make a difference.
                </p>

                <Row className="mt-4 pt-2">
                  <Col md={6}>
                    <ul className="list-unstyled about-list text-muted mb-0 mb-md-3">
                      <li>Expert IT Staffing Solutions</li>
                      <li>Talented IT Professionals & Specialists</li>
                      <li>Managed IT Services</li>
                      <li>Custom Software Development</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="list-unstyled about-list text-muted">
                      <li>Seamless Outsourcing Options</li>
                      <li>Support for 100+ IT Roles</li>
                      <li>IT Advisory & Consulting</li>
                      <li>And More...</li>
                    </ul>
                  </Col>
                </Row>
                <div className="mt-3">
                  {/* <Link href="#" className="btn btn-primary btn-hover">
                    Learn More{" "}
                    <i className="uil uil-angle-right-b align-middle"></i>
                  </Link> */}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-img mt-4 mt-lg-0">
                <Image src={AboutImage} alt="" className="img-fluid rounded" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section class="container py-5">
        <div class="text-center mb-4">
          <h2 class="fw-bold myheading">Our Story</h2>
        </div>
        <p class="lead ">
          Our journey began with a simple realization: finding the right IT talent is one of the biggest challenges businesses face today.
          With the rapid pace of technological change and a competitive job market, companies need more than just a staffing agency—they need a partner who understands their needs.
          That’s why we created <span class="text-warning fw-semibold">NEXGEN Staffing</span>, a company built on the principles of quality, integrity, and innovation.
          Over the years, we’ve grown into a leading IT recruitment firm, placing hundreds of IT professionals in roles that shape the future.
        </p>

        <div className="text-center mt-5 mb-4">
          <h2 className="fw-bold myheading">Our Mission</h2>
        </div>
        <p className="lead ">
          At <span className="text-warning fw-semibold">NEXGEN Staffing</span>, our mission is clear: href provide US businesses with top-tier IT staffing services that simplify hiring and maximize results. We aim href:
        </p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item border-0">
            <FontAwesomeIcon icon={faCheckCircle} className="text-primary fs-4" /> Connect employers with IT candidates who possess the skills and vision href succeed.
          </li>
          <li className="list-group-item border-0">
            <FontAwesomeIcon icon={faCheckCircle} className="text-primary fs-4" /> Offer tailored tech talent solutions that align with each client’s unique goals.
          </li>
          <li className="list-group-item border-0">
            <FontAwesomeIcon icon={faCheckCircle} className="text-primary fs-4" /> Foster long-term partnerships built on trust, transparency, and excellence.
          </li>
        </ul>

        <div class="text-center mt-5 mb-4">
          <h2 class="fw-bold myheading">Our Vision</h2>
        </div>
        <p class="lead ">
        We aspire href be the most innovative and reliable IT staffing agency in the US, setting the standard for how tech talent is sourced, screened, and placed. By staying ahead of industry trends and embracing new recruitment technologies, we’re shaping the future of IT hiring—one successful placement at a time.
        </p>
      </section>
    </React.Fragment>
  );
};

export default About;
