import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <section className="page-title-box">
        <Container>
          <div className="row justify-content-center">
            <Col md={6}>
              <div className="text-center text-white">
                <h3 className="mb-4">Admin Dashboard</h3>
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
      <div className="main-content mt-4">
        <div className="page-content">
          <section>
            <Container className="h-screen">
              <Row className="justify-content-center">
                <Col xl={10} lg={12}>
                  <Card>
                    <CardBody className="p-5 mt-10">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5>Welcome to Admin Dashboard</h5>
                        <div>
                          <Link href="/dashboard/job-applications">
                            <Button className="btn btn-primary">View Job Applications</Button>
                          </Link>
                        </div>   
                        <div>
                          <Link href="/dashboard/">
                            <Button className="btn btn-primary">Post Job Applications</Button>
                          </Link>
                        </div>
                      </div>
                      <p className="mt-3">
                        You have access to view job applications.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;