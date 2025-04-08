// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
// import { Form } from "react-bootstrap";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { Spinner } from "reactstrap";
// import styles from "../ExtraPages/css/SignIn.module.css";
// import signInImage from "../../assets/images/auth/sign-in.png";
// import useLoadingStore from "@/store/loading";
// import whiteLogo from "../../assets/images/logo/NexGenlogowithbg.png";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const { isLoading, setLoading } = useLoadingStore();
//   const { callbackUrl } = router.query; // Get callbackUrl from query parameters

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("rememberedEmail");
//     if (savedEmail) {
//       setEmail(savedEmail);
//       setRememberMe(true);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message);
//         if (rememberMe) {
//           localStorage.setItem("rememberedEmail", email);
//         } else {
//           localStorage.removeItem("rememberedEmail");
//         }

//         const token = data.accessToken;
//         const base64Url = token.split(".")[1];
//         const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//         const jsonPayload = decodeURIComponent(
//           atob(base64)
//             .split("")
//             .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//             .join("")
//         );
//         const decodedToken = JSON.parse(jsonPayload);
//         const userRole = decodedToken.role;
//         alert(userRole);

//         setTimeout(() => {
//           if (userRole === "superadmin" || userRole === "admin") {
//             router.push(callbackUrl || "/role-selection"); 
//           } else if (userRole === "user") {
//             router.push(callbackUrl || "/"); 
//           } else {
            
//             router.push(callbackUrl || "/");
//           }
//         }, 1000);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Failed to sign in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <section className="page-title-box">
//         <Container>
//           <div className="row justify-content-center">
//             <Col md={6}>
//               <div className="text-center text-white">
//                 <h3 className="mb-4">Sign In</h3>
//                 {/* <div className="page-next">
//                   <nav
//                     className="d-inline-block"
//                     aria-label="breadcrumb text-center"
//                   >
//                     <ol className="breadcrumb justify-content-center">
//                       <li className="breadcrumb-item">
//                         <Link href="/">Home</Link>
//                       </li>
//                       <li className="breadcrumb-item">
//                         <Link href="#">Pages</Link>
//                       </li>
//                       <li
//                         className="breadcrumb-item active"
//                         aria-current="page"
//                       >
//                         {" "}
//                         Job Grid-2{" "}
//                       </li>
//                     </ol>
//                   </nav>
//                 </div> */}
//               </div>
//             </Col>
//           </div>
//         </Container>
//       </section>
//       <div className="position-relative" style={{ zIndex: 1 }}>
//         <div className="shape">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
//             <path
//               fill="#FFFFFF"
//               fillOpacity="1"
//               d="M0,192L120,202.7C240,213,480,235,720,234.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
//             ></path>
//           </svg>
//         </div>
//       </div>

//       <div>
//         <div className="main-content mt-4">
//           <div className="page-content">
//             <section className="">
//               <Container className="try">
//                 <Row className="justify-content-center">
//                   <Col xl={10} lg={12}>
//                     <Card className="auth-box">
//                       <Row className="g-0">
//                         <Col lg={6} className="text-center bg-auth">
//                           <CardBody className="p-4">
//                             <Link href="/">
//                               <Image
//                                 src={whiteLogo}
//                                 height="90"
//                                 alt=""
//                                 className="logo-footer"
//                                 style={{
//                                   width: "4.5rem",
//                                   height: "4.5rem",
//                                   borderRadius: "50%",
//                                   objectFit: "cover",
//                                   cursor: "pointer",
//                                 }}
//                               />
//                             </Link>
//                             <div className="mt-5">
//                               <Image src={signInImage} alt="" className="img-fluid" />
//                             </div>
//                           </CardBody>
//                         </Col>
//                         <Col lg={6 } className="bg-auth">
//                           <CardBody className="auth-content p-5 h-100 text-white">
//                             <div className="w-100">
//                               <div className="text-center mb-4">
//                                 <h5>Welcome Back!</h5>
//                                 <p className="text-white-70">
//                                   Sign in to continue to NEXGEN Staffing.
//                                 </p>
//                               </div>
//                               <div
//                                 className={`${styles.messageContainer} ${message || error ? styles.show : styles.hide
//                                   }`}
//                               >
//                                 {message && (
//                                   <p className="text-primary text-center">{message}</p>
//                                 )}
//                                 {error && (
//                                   <p className="text-primary text-center">{error}</p>
//                                 )}
//                               </div>
//                               <Form onSubmit={handleSubmit} className="auth-form">
//                                 <div className="mb-3">
//                                   <label htmlFor="emailInput" className="form-label">
//                                     Email
//                                   </label>
//                                   <Input
//                                     type="email"
//                                     className="form-control"
//                                     id="emailInput"
//                                     placeholder="Enter your email"
//                                     required
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                   />
//                                 </div>
//                                 <div className="mb-3">
//                                   <label htmlFor="passwordInput" className="form-label">
//                                     Password
//                                   </label>
//                                   <Input
//                                     type="password"
//                                     className="form-control"
//                                     id="passwordInput"
//                                     placeholder="Enter your password"
//                                     required
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                   />
//                                 </div>
//                                 <div className="mb-4">
//                                   <div className="form-check">
//                                     <Input
//                                       className="form-check-input"
//                                       type="checkbox"
//                                       id="flexCheckDefault"
//                                       checked={rememberMe}
//                                       onChange={(e) => setRememberMe(e.target.checked)}
//                                     />
//                                     <Link
//                                       href="/resetpassword"
//                                       className="float-end text-white"
//                                     >
//                                       Reset Password?
//                                     </Link>
//                                     <label
//                                       className="form-check-label"
//                                       htmlFor="flexCheckDefault"
//                                     >
//                                       Remember me
//                                     </label>
//                                   </div>
//                                 </div>
//                                 <div className="text-center">
//                                   <button
//                                     type="submit"
//                                     className={`btn btn-white btn-hover w-100 ${styles.signInButton}`}
//                                     disabled={isLoading}
//                                   >
//                                     {isLoading ? <Spinner size="sm" /> : "Sign In"}
//                                   </button>
//                                 </div>
//                               </Form>
//                               <div className="mt-4 text-center">
//                                 <p className="mb-0">
//                                   Don't have an account?{" "}
//                                   <Link
//                                     href="/signup"
//                                     className="fw-medium text-white text-decoration-underline"
//                                   >
//                                     Sign Up
//                                   </Link>
//                                 </p>
//                               </div>
//                             </div>
//                           </CardBody>
//                         </Col>
//                       </Row>
//                     </Card>
//                   </Col>
//                 </Row>
//               </Container>
//             </section>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default SignIn;


import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { Form } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Spinner } from "reactstrap";
import styles from "../ExtraPages/css/SignIn.module.css";
import signInImage from "../../assets/images/auth/sign-in.png";
import useLoadingStore from "@/store/loading";
import whiteLogo from "../../assets/images/logo/NexGenlogowithbg.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { isLoading, setLoading } = useLoadingStore();
  const { callbackUrl } = router.query;

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok ) {
        setMessage(data.message);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // Store the token in cookies (needed for /api/auth/me)
        // document.cookie = `token=${data.accessToken}; path=/; max-age=3600`;

        const token = data.accessToken;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decodedToken = JSON.parse(jsonPayload);
        const userRole = decodedToken.role;
        // alert(userRole); // Uncomment if you want to keep this for debugging

        setTimeout(() => {
          if (userRole === "superadmin" || userRole === "admin") {
            router.push(callbackUrl || "/role-selection");
          } else if (userRole === "user") {
            router.push(callbackUrl || "/");
          } else {
            router.push(callbackUrl || "/");
          }
        }, 1000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
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
                <h3 className="mb-4">Sign In</h3>
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
        <div className="main-content mt-4">
          <div className="page-content">
            <section className="">
              <Container className="try">
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
                              <Image src={signInImage} alt="" className="img-fluid" />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6} className="bg-auth">
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="w-100">
                              <div className="text-center mb-4">
                                <h5>Welcome Back!</h5>
                                <p className="text-white-70">
                                  Sign in to continue to NEXGEN Staffing.
                                </p>
                              </div>
                              <div
                                className={`${styles.messageContainer} ${message || error ? styles.show : styles.hide}`}
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
                                  <label htmlFor="emailInput" className="form-label">
                                    Email
                                  </label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="emailInput"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="passwordInput" className="form-label">
                                    Password
                                  </label>
                                  <Input
                                    type="password"
                                    className="form-control"
                                    id="passwordInput"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                </div>
                                <div className="mb-4">
                                  <div className="form-check">
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                      checked={rememberMe}
                                      onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <Link
                                      href="/resetpassword"
                                      className="float-end text-white"
                                    >
                                      Reset Password?
                                    </Link>
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      Remember me
                                    </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="submit"
                                    className={`btn btn-white btn-hover w-100 ${styles.signInButton}`}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? <Spinner size="sm" /> : "Sign In"}
                                  </button>
                                </div>
                              </Form>
                              <div className="mt-4 text-center">
                                <p className="mb-0">
                                  Don't have an account?{" "}
                                  <Link
                                    href="/signup"
                                    className="fw-medium text-white text-decoration-underline"
                                  >
                                    Sign Up
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

export default SignIn;