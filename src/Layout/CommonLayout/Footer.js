import React from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import whiteLogo from "../../assets/images/logo/NexGenlogowithbg.png";

const Footer = () => {
  const footer = [
    {
      id: 1,
      title: "Quick Links",
      menu: [
        { id: 1, link: "/aboutus", subTitle: "About Us" },
        { id: 2, link: "/contact", subTitle: "Contact Us" },
        { id: 3, link: "/services", subTitle: "Services" },
        { id: 4, link: "/jobgrid2", subTitle: "Opportunity" },
      ],
    },
    {
      id: 4,
      title: "Support",
      menu: [
        { id: 1, link: "/contact", subTitle: "Help Center" },
        { id: 2, link: "/faqs", subTitle: "FAQ'S" },
        // { id: 3, link: "/privacyandpolicy", subTitle: "Privacy Policy" },
      ],
    },
  ];
  const footerIcons = [
    { id: 1, socialIcon: "uil uil-facebook-f" },
    { id: 2, socialIcon: "uil uil-linkedin-alt" },
    { id: 3, socialIcon: "uil uil-google" },
    { id: 4, socialIcon: "uil uil-twitter" },
  ];

  return (
    <React.Fragment>
      <section className="bg-footer">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="footer-item mt-4 mt-lg-0 me-lg-5">
                <div className="d-flex">
                  <Link to="/">
                    <img
                      src={whiteLogo}
                      height="90"
                      alt=""
                      className="logo-footer"
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </Link>
                </div>
                {/* <h3 className="text-white">Your IT Staffing Partner in the US</h3> */}
                <p className="text-white">
                  We connect US businesses with top IT talent for temporary, permanent, or remote roles. Based here, we understand tech trends and deliver tailored solutions. From developers to cybersecurity experts, we’ve got you covered for 2025 and beyond.
                </p>
                <p className="text-white mt-3">Follow Us on:</p>
                <ul className="footer-social-menu list-inline mb-0">
                  {footerIcons.map((footerIcondetails, key) => (
                    <li className="list-inline-item" key={key}>
                      <Link to="#">
                        <i className={footerIcondetails.socialIcon}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>


            <Col lg={8}>
              <Row>
                {footer.map((footerdetails, key) => (
                  <Col lg={3} xs={6} key={key}>
                    <div className="footer-item mt-4 mt-lg-0">
                      <p className="fs-16 text-white mb-4">{footerdetails.title}</p>
                      {(footerdetails.menu || []).map((menuInner, key) => (
                        <ul className="list-unstyled footer-list mb-0" key={key}>
                          <li className="text-white">
                            <Link
                              to={menuInner.link}
                              className="text-white text-decoration-none"
                            >
                              <i className="mdi mdi-chevron-right text-white"></i>{" "}
                              {menuInner.subTitle}
                            </Link>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </Col>
                ))}


                {/* Contact Info */}
                <Col lg={6} xs={12}>
                  <div className="footer-item mt-4 mt-lg-0">
                    <p className="fs-16 text-white mb-4">Contact Info</p>
                    <ul className="list-unstyled footer-list mb-0 text-decoration-none">
                      <li className="text-white">
                        <i className="mdi mdi-map-marker"></i>{" "}
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=23704+100th+Ave+SE+Suite+A+104+Kent+WA+98031"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-decoration-none"
                        >
                          23704 100th Ave SE Suite A 104, Kent, WA 98031
                        </a>
                      </li>

                      <li className="text-white">
                        <i className="mdi mdi-email"></i>{" "}
                        <a href="mailto:info@nexgen.com" className="text-white text-decoration-none">
                          info@nexgenstaffing.com
                        </a>
                      </li>
                      <li className="text-white text-decoration-none">
                        <i className="mdi mdi-phone"></i>{" "}
                        <a href="tel:+12065551234" className="text-white text-decoration-none">
                        206-608-3534
                        </a>
                      </li>

                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="footer-alt">
        <Container>
          <Row>
            <Col lg={12}>
              <p className="text-white-50 text-center mb-0">
                {new Date().getFullYear()} © NEXGEN Staffing. All Rights Reserved.
                <Link
                  to="/"
                  target="_blank"
                  className="text-reset text-decoration-underline ms-1"
                >
                  Terms & Conditions
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Footer;