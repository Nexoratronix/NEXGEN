import React from "react";

import lightLogo from "../../assets/images/logo-light.png";
import darkLogo from "../../assets/images/logo-dark.png";
import Image from "next/image";
import signInImage from "../../assets/images/auth/sign-in.png";
import whiteLogo from "../../assets/images/logo/NexGenlogowithbg.png";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Link from "next/link";

const SignOut = () => {
  // document.title = "Sign Out | NEXGEN Staffing ";
  return (
    <React.Fragment>
       <section className="page-title-box">
              <Container>
                <div className="row justify-content-center">
                  <Col md={6}>
                    <div className="text-center text-white">
                      <h3 className="mb-4">Sign Out</h3>
                      {/* <div className="page-next">
                        <nav
                          className="d-inline-block"
                          aria-label="breadcrumb text-center"
                        >
                          <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item">
                              <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                              <Link href="#">Pages</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {" "}
                              Job Grid-2{" "}
                            </li>
                          </ol>
                        </nav>
                      </div> */}
                    </div>
                  </Col>
                </div>
              </Container>
            </section>
            <div className="position-relative" style={{ zIndex: 1 }}>
              <div className="shape">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
                  <path
                    fill="#FFFFFF"
                    fillOpacity="1"
                    d="M0,192L120,202.7C240,213,480,235,720,234.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                  ></path>
                </svg>
              </div>
            </div>
      <div>
        <div className="main-content">
          <div className="page-content">
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row>
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link href="/">
                              <Image
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
                            <div className="mt-5">
                              <Image
                                src={signInImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <div className="auth-content card-body p-5 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>You are Logged Out</h5>
                                <p className="text-white-70">
                                  Thank you for using NEXGEN Staffing
                                </p>
                              </div>
                              <Link
                                href="/signin"
                                className="btn btn-white btn-hover w-100"
                              >
                                Sign In
                              </Link>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Don't have an account ?{" "}
                                  <Link
                                    href="/signup"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    {" "}
                                    Sign Up{" "}
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignOut;
