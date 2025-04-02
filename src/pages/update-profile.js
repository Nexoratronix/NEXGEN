import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Form, Input, Button } from "reactstrap";
import { useRouter } from "next/router";
import useLoadingStore from "@/store/loading";
import { Spinner } from "reactstrap";
import styles from "../apppages/ExtraPages/css/SignIn.module.css";

const UpdateProfile = () => {
  const [userId, setUserId] = useState("");
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoadingStore();
  const router = useRouter();


  
  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await fetch("/api/check-role", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok || data.role !== "superadmin") {
          router.push(`/signin?callbackUrl=${encodeURIComponent("/update-profile")}`);
        }
      } catch (error) {
        router.push(`/signin?callbackUrl=${encodeURIComponent("/update-profile")}`);
      }
    };
    checkRole();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          router.push("/dashboard/superadmin");
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to update role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="main-content mt-4">
        <div className="page-content">
          <section className="bg-auth">
            <Container>
              <Row className="justify-content-center">
                <Col xl={10} lg={12}>
                  <Card className="auth-box">
                    <CardBody className="auth-content p-5 text-white">
                      <div className="w-100">
                        <div className="text-center mb-4">
                          <h5>Update User Role</h5>
                          <p className="text-white-70">
                            As a superadmin, you can update the role of any user.
                          </p>
                        </div>
                        <div
                          className={`${styles.messageContainer} ${
                            message || error ? styles.show : styles.hide
                          }`}
                        >
                          {message && (
                            <p className="text-primary text-center">{message}</p>
                          )}
                          {error && (
                            <p className="text-primary text-center">{error}</p>
                          )}
                        </div>
                        <Form onSubmit={handleSubmit} className="auth-form">
                          <div className="mb-3">
                            <label htmlFor="userIdInput" className="form-label">
                              User ID
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="userIdInput"
                              placeholder="Enter the user ID"
                              required
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="roleInput" className="form-label">
                              New Role
                            </label>
                            <Input
                              type="select"
                              className="form-control"
                              id="roleInput"
                              required
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value)}
                            >
                              <option value="">Select a role</option>
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                              <option value="superadmin">Superadmin</option>
                            </Input>
                          </div>
                          <div className="text-center">
                            <Button
                              type="submit"
                              className={`btn btn-white btn-hover w-100 ${styles.signInButton}`}
                              disabled={isLoading}
                            >
                              {isLoading ? <Spinner size="sm" /> : "Update Role"}
                            </Button>
                          </div>
                        </Form>
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

export default UpdateProfile;