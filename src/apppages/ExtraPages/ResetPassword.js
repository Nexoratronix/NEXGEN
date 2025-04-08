import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import Link from "next/link";
import { Form } from "react-bootstrap";
import whiteLogo from "../../assets/images/logo/NexGenlogowithbg.png";
import resetPasswordImage from "../../assets/images/auth/reset-password.png";
import useLoadingStore from "@/store/loading";

const ResetPassword = () => {
  console.log('Rendering ResetPassword, isServer:', typeof window === 'undefined');
  const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Verify OTP and reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoadingStore();

  // Log the step state for debugging
  useEffect(() => {
    console.log("Current step:", step);
  }, [step]);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      console.log("Sending OTP request for email:", email);
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        console.log("OTP request successful, transitioning to Step 2");
        setMessage(data.message);
        setStep(2);
      } else {
        console.log("OTP request failed:", data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error("Error in handleRequestOtp:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and set new password
  const handleVerifyOtpAndReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Client-side password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
      );
      setLoading(false);
      return;
    }

    try {
      console.log("Verifying OTP and resetting password for email:", email);
      const response = await fetch("/api/auth/verify-otp-and-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      console.log("Verify OTP response status:", response.status);
      const data = await response.json();
      console.log("Verify OTP response data:", data);

      if (response.ok) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error in handleVerifyOtpAndReset:", err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Reset Password | NEXGEN Staffing</title>
      </Head>
      <section className="page-title-box">
        <Container>
          <div className="row justify-content-center">
            <Col md={6}>
              <div className="text-center text-white">
                <h3 className="mb-4">Reset Password</h3>
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
            <section className="">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="g-0">
                        <Col lg={6} className="text-center bg-auth">
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
                                src={resetPasswordImage}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6} className="bg-auth">
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="text-center mb-4">
                              <h5>Reset Password</h5>
                              <p className="text-white-50">
                                Reset your password with NEXGEN Staffing.
                              </p>
                            </div>
                            {message && (
                              <div className="alert alert-success text-center mb-4" role="alert">
                                {message}
                              </div>
                            )}
                            {error && (
                              <div className="alert alert-danger text-center mb-4" role="alert">
                                {error}
                              </div>
                            )}
                            {step === 1 ? (
                              // Step 1: Request OTP
                              <Form className="auth-form text-white" onSubmit={handleRequestOtp}>
                                <div
                                  className="alert alert-warning text-center mb-4"
                                  role="alert"
                                >
                                  Enter your email to receive an OTP.
                                </div>
                                <div className="mb-4">
                                  <label className="form-label" htmlFor="email">
                                    Email
                                  </label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="mt-3">
                                  <button
                                    type="submit"
                                    className="btn btn-white w-100"
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Sending..." : "Send OTP"}
                                  </button>
                                </div>
                              </Form>
                            ) : (
                              // Step 2: Verify OTP and set new password
                              <Form className="auth-form text-white" onSubmit={handleVerifyOtpAndReset}>
                                <div
                                  className="alert alert-warning text-center mb-4"
                                  role="alert"
                                >
                                  Enter the OTP sent to your email and your new password.
                                </div>
                                <div className="mb-4">
                                  <label className="form-label" htmlFor="otp">
                                    OTP
                                  </label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="otp"
                                    placeholder="Enter the 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="form-label" htmlFor="password">
                                    New Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="mb-4">
                                  <label className="form-label" htmlFor="confirmPassword">
                                    Confirm Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="mt-3">
                                  <button
                                    type="submit"
                                    className="btn btn-white w-100"
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Resetting..." : "Reset Password"}
                                  </button>
                                </div>
                              </Form>
                            )}
                            <div className="mt-5 text-center text-white-50">
                              <p>
                                Remembered It?{" "}
                                <Link
                                  href="/signin"
                                  className="fw-medium text-white text-decoration-underline"
                                >
                                  Login
                                </Link>
                              </p>
                            </div>
                          </CardBody>
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

export default ResetPassword;