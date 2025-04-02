import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Container, Card, Col, Input, Row, CardBody, Button } from "reactstrap";
import { Form } from "react-bootstrap";
import Image from "next/image";
import whiteLogo from "../../assets/images/logo/NexGenlogowithbg.png";
import signUpImage from "../../assets/images/auth/sign-up.png";
import { useRouter } from "next/router";

import { Spinner } from "reactstrap";

import styles from "../ExtraPages/css/SignUp.module.css"
import useLoadingStore from "@/store/loading";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();
  const otpRefs = useRef([]);
  const { isLoading, setLoading } = useLoadingStore();

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // Check if all OTP boxes are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Send OTP
  const handleSendOtp = async () => {
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/register/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setShowOtpField(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/register/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setIsOtpVerified(true);
        setShowOtpField(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      setError("Please verify your email first");
      return;
    }
    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/register/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }), // Removed otp
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => router.push("/signin"), 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <section className="page-title-box">
        <Container>
          <div className="row justify-content-center">
            <Col md={6}>
              <div className="text-center text-white">
                <h3 className="mb-4">Sign Up</h3>
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
            <section className="">
              <Container className="">
                <Row className="justify-content-center ">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box ">
                      <Row className="align-items-center ">
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
                              <Image src={signUpImage} alt="" className="img-fluid" />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6} className="bg-auth">
                          <CardBody className="auth-content p-5 text-white">
                            <div className="w-100">
                              <div className="text-center">
                                <h5>Let's Get Started</h5>
                                <p className="text-white-70">
                                  Sign Up and get access to all the features of NEXGEN Staffing
                                </p>
                              </div>
                              {message && (
                                <p className="text-primary text-center mt-3">{message}</p>
                              )}
                              {error && (
                                <p className="text-primary text-center mt-3">{error}</p>
                              )}
                              <Form onSubmit={handleSignUp} className="auth-form">
                                <div className="mb-3">
                                  <label htmlFor="usernameInput" className="form-label">
                                    Username
                                  </label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="usernameInput"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                  />
                                </div>
                                <div className="mb-3 position-relative">
                                  <label htmlFor="emailInput" className="form-label">
                                    Email
                                  </label>
                                  <div className="d-flex align-items-center">
                                    <Input
                                      type="email"
                                      className="form-control"
                                      required
                                      id="emailInput"
                                      placeholder="Enter your email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      disabled={isOtpVerified}
                                    />
                                    {email && !isOtpVerified && (
                                      <Button
                                        onClick={handleSendOtp}
                                        className={`btn btn-primary ms-2 ${styles.verifyButton}`}
                                        disabled={isLoading}
                                      >
                                        {isLoading ? (
                                          <Spinner size="sm" />
                                        ) : (
                                          "Verify"
                                        )}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className={`${styles.otpContainer} ${showOtpField && !isOtpVerified
                                    ? styles.show
                                    : styles.hide
                                    }`}
                                >
                                  <label className="form-label">Enter OTP</label>
                                  <div className="d-flex justify-content-between mb-3">
                                    {otp.map((digit, index) => (
                                      <Input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) =>
                                          handleOtpChange(index, e.target.value)
                                        }
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        ref={(el) => (otpRefs.current[index] = el)}
                                        className={`form-control text-center text-white ${styles.otpInput}`}
                                      />
                                    ))}
                                  </div>
                                  <Button
                                    onClick={handleVerifyOtp}
                                    className={`btn btn-primary w-100 ${styles.submitButton}`}
                                    disabled={isLoading || !isOtpComplete}
                                  >
                                    {isLoading ? (
                                      <Spinner size="sm" />
                                    ) : isOtpComplete ? (
                                      "Submit"
                                    ) : (
                                      "Verify OTP"
                                    )}
                                  </Button>
                                </div>
                                <div
                                  className={`${styles.additionalFields} ${isOtpVerified ? styles.show : styles.hide
                                    }`}
                                >
                                  <div className="mb-3">
                                    <label htmlFor="passwordInput" className="form-label">
                                      Password
                                    </label>
                                    <Input
                                      type="password"
                                      className="form-control"
                                      id="passwordInput"
                                      placeholder="Enter your password"
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="mb-4">
                                    <div className="form-check">
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        checked={termsAccepted}
                                        onChange={(e) =>
                                          setTermsAccepted(e.target.checked)
                                        }
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                      >
                                        I agree to the{" "}
                                        <Link
                                          href="#"
                                          className="text-white text-decoration-underline"
                                        >
                                          Terms and conditions
                                        </Link>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <Button
                                      type="submit"
                                      className="btn btn-white btn-hover w-100"
                                      disabled={isLoading}
                                    >
                                      {isLoading ? <Spinner size="sm" /> : "Sign Up"}
                                    </Button>
                                  </div>
                                </div>
                              </Form>
                              <div className="mt-3 text-center">
                                <p className="mb-0">
                                  Already a member?{" "}
                                  <Link
                                    href="/signin"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    Sign In
                                  </Link>
                                </p>
                              </div>
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

export default SignUp;