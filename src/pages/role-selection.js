import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useRouter } from "next/router";

const RoleSelection = () => {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await fetch("/api/check-role", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setRole(data.role);
        } else {
          router.push("/signin");
        }
      } catch (error) {
        router.push("/signin");
      } finally {
        setIsLoading(false);
      }
    };
    checkRole();
  }, [router]);

  const handlePublicPage = () => {
    router.push("/");
  };

  const handleDashboard = () => {
    if (role === "superadmin") {
      router.push("/dashboard/superadmin");
    } else if (role === "admin") {
      router.push("/dashboard/admin");
    }
    // else if (role === "user"){
    //   router.push("/")
    // }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!role) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="main-content mt-4">
        <div className="page-content">
          <section className="bg-auth">
            <Container>
              <Row className="justify-content-center">
                <Col xl={10} lg={12}>
                  <Card className="auth-box">
                    <CardBody className="p-5 text-center text-white">
                      <h5>Welcome, {role === "superadmin" ? "Superadmin" : "Admin"}!</h5>
                      <p className="text-white-70 mt-3">
                        Please choose where you would like to go:
                      </p>
                      <div className="mt-4">
                        <Button
                          onClick={handlePublicPage}
                          className="btn btn-primary me-3"
                        >
                          Public Page
                        </Button>
                        <Button
                          onClick={handleDashboard}
                          className="btn btn-primary"
                        >
                          {role === "superadmin" ? "Superadmin Dashboard" : "Admin Dashboard"}
                        </Button>
                      </div>
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

export default RoleSelection;