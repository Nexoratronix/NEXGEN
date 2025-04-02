import React from "react";
import  Link  from "next/link";
import { Col, Container, Row } from "reactstrap";

//import Images
import Error404Image from "../../assets/images/404.png";

const Error404 = () => {
  document.title = "Error 404 | NEXGEN Staffing - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <section className="bg-error bg-auth text-dark">
              <Container>
                <Row className="justify-content-center">
                  <Col lg={6}>
                    <div className="text-center">
                      <img src={Error404Image} alt="" className="img-fluid" />
                      <div className="mt-5">
                        <h4 className="text-uppercase mt-3">
                          Sorry, page not found
                        </h4>
                        <p className="text-muted">
                          It will be as simple as Occidental in fact, it will be
                          Occidental
                        </p>
                        <div className="mt-4">
                          <Link
                            className="btn btn-primary waves-effect waves-light"
                            href="/"
                          >
                            <i className="mdi mdi-home"></i> Back href Home
                          </Link>
                        </div>
                      </div>
                    </div>
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

export default Error404;
