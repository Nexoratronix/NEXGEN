
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import {
  Col,
  Row,
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Spinner,
  Button,
} from "reactstrap";
import Link from "next/link";
import io from "socket.io-client";
import { useRouter } from "next/router";
import classname from "classnames";
import Image from "next/image";
import withRouter from "../../components/withRouter";
import darkLogo from "../../assets/images/logo/logo.png";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/pages/_app";
import jwt from "jsonwebtoken";

let socket;

const NavBar = (props) => {
  const { auth, setAuth } = useContext(AuthContext) || { auth: null, setAuth: () => {} };
  const [message, setMessage] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [home, setHome] = useState(false);
  const [company, setCompany] = useState(false);
  const [pages, setPages] = useState(false);
  const [blog, setBlog] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [hasBeenAuthenticated, setHasBeenAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [navClass, setNavClass] = useState(false);
  const socketInitialized = useRef(false);
 
  // Toggle functions
  const toggle = () => setIsOpen(!isOpen);
  const dropDownNotification = () => setNotificationOpen((prevState) => !prevState);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);
                                                                                                                                                                                                     
  // All useEffect hooks    
  useEffect(() => {
    // if (typeof window === "undefined") return;

    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (accessToken && !auth) {
      try {
        const decoded = jwt.verify(accessToken, process.env.NEXTAUTH_SECRET);
        setAuth(decoded);
      } catch (error) {
        setAuth(null);
      }
    }
  }, [auth, setAuth]);

  useEffect(() => {
    // if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollup = window.pageYOffset;
      setNavClass(scrollup > 0 ? "nav-sticky" : "");
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
    // if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    const pathName = router.pathname;
    const ul = document.getElementById("navbarCollapse");
    if (!ul) return;

    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    let matchingMenuItem = null;
    for (let i = 0; i < items.length; ++i) {
      const itemPath = new URL(items[i].href).pathname;
      if (pathName === itemPath) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) activateParentDropdown(matchingMenuItem);
  }, [router.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }
    };

    if (typeof window !== "undefined") fetchUserData();
  }, [router.asPath]);

  useEffect(() => {
    if (!isAuthenticated || !userId || socketInitialized.current) return;
  
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
      withCredentials: true,
      reconnection: true, // Enable reconnection
      reconnectionAttempts: 5, // Retry 5 times
      reconnectionDelay: 1000, // Wait 1s between retries
    });
  
    socket.on("connect", () => {
      console.log("Connected to WebSocket server:", socket.id);
      socket.emit("join", userId);
    });
  
    socket.on("newNotification", (message) => {
      console.log("New notification received:", message);
      setNotifications((prev) => [message, ...prev]);
      toast.info("New notification received!");
    });
  
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message);
      toast.error("Failed to connect to notification server.");
    });
  
    socket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket server:", reason);
    });
  
    socketInitialized.current = true;
  
    return () => {
      socket.disconnect();
      socketInitialized.current = false;
    };
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (typeof window !== "undefined") fetchUserId();
  }, []); // Added fetchUserId as dependecy 

  // Helper functions
  const removeActivation = (items) => {
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      const parent = item.parentElement;
      if (item && item.classList.contains("active")) item.classList.remove("active");
      if (parent && parent.classList.contains("active")) parent.classList.remove("active");
    }
  };

  const activateParentDropdown = (item) => {
    item.classList.add("active");
    let parent = item.parentElement?.parentElement?.parentElement;
    while (parent) {
      parent.classList.add("active");
      parent = parent.parentElement;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      return response.ok;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const handleSignOut = useCallback(async () => {
    setMessage("");
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(null);
        setUserProfile(false);
        setIsAuthenticated(false);
        setUserId(null);
        setHasBeenAuthenticated(false);
        setNotifications([]);
        setMessage(data.message);
        setTimeout(() => router.push("/signout"), 1000);
      } else {
        setMessage(data.message || "Failed to sign out");
      }
    } catch (error) {
      setMessage("Failed to sign out. Please try again.");
    }
  }, [
    router,
    setMessage,
    setUserData,
    setUserProfile,
    setIsAuthenticated,
    setUserId,
    setHasBeenAuthenticated,
    setNotifications,
  ]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data.id);
        setIsAuthenticated(true);
        setHasBeenAuthenticated(true);
      } else if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          const retryResponse = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
          });
          if (retryResponse.ok) {
            const data = await retryResponse.json();
            setUserId(data.id);
            setIsAuthenticated(true);
            setHasBeenAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            if (hasBeenAuthenticated) {
              toast.error("Session expired. Please sign in again.");
              handleSignOut();
            }
          }
        } else {
          setIsAuthenticated(false);
          if (hasBeenAuthenticated) {
            toast.error("Session expired. Please sign in again.");
            handleSignOut();
          }
        }
      } else {
        setIsAuthenticated(false);
        if (hasBeenAuthenticated) toast.error("Unauthorized: Please sign in.");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsAuthenticated(false);
      if (hasBeenAuthenticated) toast.error("Failed to authenticate. Please sign in again.");
    }
  }, [hasBeenAuthenticated, handleSignOut]);

  const fetchUserId = useCallback(async () => {
    // if (typeof window === "undefined") return;
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUserId(data.id);
      }
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }
  }, [setUserId]); // Added setUserId as dependency

  const handleSignIn = () => router.push("/signin");

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) => (notif._id === notificationId ? { ...notif, isRead: true } : notif))
        );
        toast.success("Notification marked as read");
      } else {
        toast.error("Failed to mark notification as read");
      }
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      if (response.ok) {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
        toast.success("All notifications marked as read");
      } else {
        toast.error("Failed to mark all notifications as read");
      }
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const clearAllNotifications = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clearAll: true }),
      });
      if (response.ok) {
        setNotifications([]);
        toast.success("All notifications cleared");
      } else {
        toast.error("Failed to clear notifications");
      }
    } catch (error) {
      toast.error("Failed to clear notifications");
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    if (notification.type === "job-application-admin" && notification.relatedId) {
      router.push(`/dashboard/job-applications?applicationId=${notification.relatedId}`);
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  // Render logic
  if (typeof window === "undefined") {
    return (
      <nav className="navbar navbar-expand-lg fixed-top sticky p-0">
        <Container fluid className="custom-container">
          <Link href="/" className="navbar-brand text-dark fw-bold me-auto">
            <Image src={darkLogo} height="80" alt="" className="logo-dark" style={{ height: "6rem", width: "6rem" }} />
          </Link>
        </Container>
      </nav>
    );
  }
  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
        id="navigation"
      >
        <Container fluid className="custom-container">
          {/* Replace React Router Link with Next.js Link */}
          <Link href="/" className="navbar-brand text-dark fw-bold me-auto">
            <Image src={darkLogo} height="80" alt="" className="logo-dark" style={{ height: "6rem", width: "6rem" }} />
            {/* <Image src={lightLogo} height="22" alt="" className="logo-light" /> */}
          </Link>
          <div>
          {auth && (
            <NavbarToggler
              className="me-3"
              type="button"
              onClick={() => toggle()}
            >
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
          )}
          </div>
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav mx-auto navbar-center">
              <NavItem>
                {/* Replace React Router Link with Next.js Link */}
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </NavItem>

              <NavItem>
                {/* Replace React Router Link with Next.js Link */}
                <Link href="/aboutus" className="nav-link">
                  About Us
                </Link>
              </NavItem>
              <NavItem>
                {/* Replace React Router Link with Next.js Link */}
                <Link href="/services" className="nav-link">
                  Services
                </Link>
              </NavItem>

              {/* Commented code remains unchanged */}
              {/* <NavItem className="dropdown dropdown-hover">
                <NavLink
                  href="/#"
                  id="jobsdropdown"
                  role="button"
                  onClick={() => setCompany(!company)}
                >
                  Company <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: company
                  })}
                  aria-labelledby="jobsdropdown"
                >
                  <li>
                    <Link className="dropdown-item" href="/aboutus">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/services">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/team">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/pricing">
                      Pricing
                    </Link>
                  </li>
                  <Link className="dropdown-item" href="/privacyandpolicy">
                    Priacy & Policy
                  </Link>
                  <li>
                    <Link className="dropdown-item" href="/faqs">
                      Faqs
                    </Link>
                  </li>
                </ul>
              </NavItem> */}
              {/* <li className="nav-item dropdown dropdown-hover">
                <Link
                  href="/#"
                  id="pagesdoropdown"
                  className="nav-link dropdown-toggle arrow-none"
                  onClick={() => setPages(!pages)}
                >
                  Pages <div className="arrow-down"></div>
                </Link>
                <div
                  className={classname(
                    "dropdown-menu dropdown-menu-lg dropdown-menu-center",
                    { show: pages }
                  )}
                  aria-labelledby="pagesdoropdown"
                >
                  <Row>
                    <Col lg={4}>
                      <span className="dropdown-header">Jobs</span>
                      <div>
                        <Link className="dropdown-item" href="/joblist">
                          Job List
                        </Link>
                        <Link className="dropdown-item" href="/joblist2">
                          Job List-2
                        </Link>
                        <Link className="dropdown-item" href="/jobgrid">
                          Job Grid
                        </Link>
                        <Link className="dropdown-item" href="/jobgrid2">
                          Job Grid-2
                        </Link>
                        <Link className="dropdown-item" href="/jobdetails">
                          Job Details
                        </Link>
                        <Link className="dropdown-item" href="/jobscategories">
                          Jobs Categories
                        </Link>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <span className="dropdown-header">
                        Candidates / Companys
                      </span>
                      <div>
                        <Link className="dropdown-item" href="/candidatelist">
                          Candidate List
                        </Link>
                        <Link className="dropdown-item" href="/candidategrid">
                          Candidate Grid
                        </Link>
                        <Link className="dropdown-item" href="/candidatedetails">
                          Candidate Details
                        </Link>
                        <Link className="dropdown-item" href="/companylist">
                          Company List
                        </Link>
                        <Link className="dropdown-item" href="/companydetails">
                          Company Details
                        </Link>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <span className="dropdown-header">Extra Pages</span>
                      <div>
                        <Link className="dropdown-item" href="/signup">
                          Sign Up
                        </Link>
                        <Link className="dropdown-item" href="/signin">
                          Sign In
                        </Link>
                        <Link className="dropdown-item" href="/signout">
                          Sign Out
                        </Link>
                        <Link className="dropdown-item" href="/resetpassword">
                          Reset Password
                        </Link>
                        <Link className="dropdown-item" href="/comingsoon">
                          Coming Soon
                        </Link>
                        <Link className="dropdown-item" href="/error404">
                          404 Error
                        </Link>
                        <Link className="dropdown-item" href="/components">
                          Components
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </div>
              </li> */}
              {/* <NavItem className="dropdown dropdown-hover">
                <NavLink
                  href="/#"
                  id="productdropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={() => setBlog(!blog)}
                >
                  Blog <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: blog
                  })}
                  aria-labelledby="productdropdown"
                >
                  <li>
                    <Link className="dropdown-item" href="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/bloggrid">
                      Blog Grid
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/blogmodern">
                      Blog Modern
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/blogmasonary">
                      Blog Masonry
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/blogdetails">
                      Blog details
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/blogauther">
                      Blog Author
                    </Link>
                  </li>
                </ul>
              </NavItem> */}
              <NavItem>
                {/* Replace React Router Link with Next.js Link */}
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </NavItem>

              <NavItem className="dropdown dropdown-hover">
                <NavLink
                  href="/#" // Use href instead of href for NavLink
                  id="productdropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={() => setBlog(!blog)}
                >
                  More <div className="arrow-down"></div>
                </NavLink>
                <ul
                  className={classname("dropdown-menu dropdown-menu-center", {
                    show: blog
                  })}
                  aria-labelledby="productdropdown"
                >
                  {/* <li>
                    <Link className="dropdown-item" href="/blogmodern">
                      Blog
                    </Link>
                  </li> */}
                  <li>
                    {/* Replace React Router Link with Next.js Link */}
                    <Link href="/jobgrid2" className="dropdown-item">
                      Opportunity
                    </Link>
                  </li>
                  {/* <Link className="dropdown-item" href="/jobscategories">
                    Jobs Categories
                  </Link> */}

                  {/* <Link className="dropdown-item" href="/HireCandidate">
                    Hire Candidate
                  </Link> */}
                </ul>
              </NavItem>
            </ul>
          </Collapse>

          {/* Commented code remains unchanged */}
          <ul className="header-menu list-inline d-flex align-items-center mb-0">
            {isAuthenticated && userId && (
              <li className="list-inline-item me-4">
                <Dropdown isOpen={notificationOpen} toggle={dropDownNotification}>
                  <DropdownToggle
                    href="#"
                    className="header-item noti-icon position-relative"
                    id="notification"
                    type="button"
                    tag="a"
                    aria-label="Notifications"
                    style={{ paddingRight: "0px" }}
                  >
                    <i className="mdi mdi-bell fs-22"></i>
                    {unreadCount > 0 && (
                      <div
                        className="count position-absolute"
                        style={{
                          backgroundColor: "#ff4d4f",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          fontSize: "12px",
                          top: "5px",
                          right: "-5px",
                        }}
                      >
                        {unreadCount}
                      </div>
                    )}
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-sm dropdown-menu-end p-0"
                    aria-labelledby="notification"
                    end
                    style={{
                      minWidth: "300px",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    <div className="notification-header border-bottom bg-light p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Notifications</h6>
                        {unreadCount > 0 && (
                          <Button
                            color="link"
                            size="sm"
                            className="p-0 text-primary"
                            onClick={markAllAsRead}
                            aria-label="Mark all notifications as read"
                          >
                            Mark all as read
                          </Button>
                        )}
                      </div>
                      <p className="text-muted fs-13 mb-0">
                        You have {unreadCount} unread notifications
                      </p>
                    </div>
                    <div
                      className="notification-wrapper dropdown-scroll"
                      style={{ maxHeight: "300px", overflowY: "auto" }}
                    >
                      {notifications.length === 0 && (
                        <p className="text-center p-2">No notifications</p>
                      )}
                      {notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`notification-item d-block p-3 ${!notif.isRead ? "bg-light" : ""}`}
                          style={{ cursor: "pointer", borderBottom: "1px solid #f1f1f1" }}
                          onClick={() => handleNotificationClick(notif)}
                          role="button"
                          tabIndex={0}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") handleNotificationClick(notif);
                          }}
                          aria-label={`Notification: ${notif.message}`}
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-3">
                              <div
                                className={`avatar-xs ${!notif.isRead ? "bg-primary" : "bg-secondary"} text-white rounded-circle text-center`}
                              >
                                <i
                                  className={
                                    notif.type === "sign-in"
                                      ? "uil uil-user-check"
                                      : "uil uil-briefcase"
                                  }
                                ></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6
                                className={`mt-0 mb-1 fs-14 ${!notif.isRead ? "fw-bold" : ""}`}
                              >
                                {notif.message}
                              </h6>
                              <p className="mb-0 fs-12 text-muted">
                                <i className="mdi mdi-clock-outline"></i>{" "}
                                <span>
                                  {formatDistanceToNow(new Date(notif.createdAt), {
                                    addSuffix: true,
                                  })}
                                </span>
                              </p>
                            </div>
                            {!notif.isRead && (
                              <div className="flex-shrink-0">
                                <Button
                                  color="link"
                                  size="sm"
                                  className="p-0 text-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notif._id);
                                  }}
                                  aria-label={`Mark notification as read: ${notif.message}`}
                                >
                                  <i className="mdi mdi-check"></i>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {notifications.length > 0 && (
                      <div className="notification-footer border-top text-center p-2">
                        <Button
                          color="link"
                          className="primary-link fs-13"
                          onClick={clearAllNotifications}
                          aria-label="Clear all notifications"
                        >
                          <i className="mdi mdi-trash-can me-1"></i>
                          <span>Clear All</span>
                        </Button>
                      </div>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </li>
            )}
            <Dropdown className="list-inline mb-0">
              {userData ? (
                <Dropdown
                  onClick={() => setUserProfile(!userProfile)}
                  isOpen={userProfile}
                  toggle={dropDownuserprofile}
                  className="list-inline-item"
                >
                  <DropdownToggle
                    href="#"
                    className="header-item d-flex align-items-center"
                    id="userdropdown"
                    type="button"
                    tag="a"
                    aria-expanded="false"
                  >
                    <div
                      className="rounded-circle me-1 d-flex align-items-center justify-content-center"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "rgb(45 229 14)",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {userData.username ? userData.username.charAt(0).toUpperCase() : ""}
                    </div>
                    <span className="d-none d-md-inline-block fw-medium align-items-center justify-content-center">
                      Hi, {userData.username}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu
                    className="dropdown-menu-end"
                    aria-labelledby="userdropdown"
                    end
                  >
                    {/* <li>
                      <Link className="dropdown-item" href="/managejobs">
                        Manage Jobs
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/bookmarkjobs">
                        Bookmarks Jobs
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="/myprofile">
                        My Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link className="dropdown-item" href="/signout" onClick={handleSignOut}>
                        Sign Out
                      </Link>
                    </li>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                // Show Sign In button if user is not signed in
                <li className="list-inline-item">
                  <button className="btn btn-primary" onClick={handleSignIn}>
                    Sign In
                  </button>
                </li>
              )}
            </Dropdown>
          </ul>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
