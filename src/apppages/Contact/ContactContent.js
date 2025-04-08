import React from "react";
import { Form } from "react-bootstrap";
import { Col, Container, Row, Input, Label } from "reactstrap";

//Import Images
import contactImage from "../../assets/images/contact.png";
import Image from "next/image";
const ContactContent = () => {
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="align-items-center mt-5">
            <Col lg={6}>
              <div className="section-title mt-4 mt-lg-0">
                <h3 className="title myheading">Get in touch</h3>
                <p className="text-muted">
                  Start working with NEXGEN Staffing that can provide everything you need
                  href generate awareness, drive traffic, connect.
                </p>
                <Form
                  method="post"
                  className="contact-form mt-4"
                  name="myForm"
                  id="myForm"
                >
                  <span id="error-msg"></span>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label htmlFor="nameInput" className="form-label">
                          Name
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Enter your name"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label htmlFor="emailInput" className="form-label">
                          Email
                        </Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="emaiol"
                          name="email"
                          placeholder="Enter your email"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label htmlFor="subjectInput" className="form-label">
                          Subject
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Enter your subject"
                        />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label htmlFor="meassageInput" className="form-label">
                          Your Message
                        </Label>
                        <textarea
                          className="form-control"
                          placeholder="Enter your message"
                          name="comments"
                          rows="3"
                        ></textarea>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-end">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      {" "}
                      Send Message <i className="uil uil-message ms-1"></i>
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg={5} className="ms-auto order-first order-lg-last">
              <div className="text-center">
                <Image src={contactImage} alt="" className="img-fluid" />
              </div>
              <div className="mt-4 pt-3">
                <div className="d-flex text-muted align-items-center mt-2">
                  <div className="flex-shrink-0 fs-22 text-primary">
                    <i className="uil uil-map-marker"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=23704+100th+Ave+SE+Suite+A+104+Kent+WA+98031"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark text-decoration-none"
                    >
                      23704 100th ave se suite a 104 kent wa 98031
                    </a>
                  </div>
                </div>
                <div className="d-flex text-muted align-items-center mt-2">
                  <div className="flex-shrink-0 fs-22 text-primary">
                    <i className="uil uil-envelope"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <p className="mb-0 text-dark">info@nexgenstaffing.com</p>
                  </div>
                </div>
                <div className="d-flex text-muted align-items-center mt-2">
                  <div className="flex-shrink-0 fs-22 text-primary">
                    <i className="uil uil-phone-alt"></i>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <a href="tel:2066083534" style={{ textDecoration: "none", color: "inherit" }}>
                      <p className="mb-0 text-dark">206-608-3534</p>
                    </a>
                  </div>

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="map">
        <div className="map">
          <iframe
            title="maps"
            src="https://www.google.com/maps/embed/v1/place?q=23704+100th+Ave+SE+Suite+A+104+Kent+WA+98031&key=YOUR_API_KEY"
            height="350"
            style={{ border: 0, width: "100%" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </React.Fragment>
  );
};

export default ContactContent;
