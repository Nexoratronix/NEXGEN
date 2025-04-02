import React from "react";
import { Col, Row, Container } from "reactstrap";
import Link from "next/link";

const Cta = () => {
  return (
    <React.Fragment>
      <section className="section bg-light">
        <Container className="container">
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="text-center">
                <h2 className="text-primary mb-4">
                  Unlock Your IT Potential with{" "}
                  <span className="text-warning fw-bold">Expert Solutions</span>
                </h2>
                <p className="text-muted">
                  From staffing and software development href cloud engineering and 24/7 support, we’ve got your IT needs covered. Let’s build your success together.
                </p>
                <div className="mt-4 pt-2">
                  <Link href="/contact" className="btn btn-primary btn-hover">
                    Get Started Today{" "}
                    <i className="uil uil-rocket align-middle ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Cta;
