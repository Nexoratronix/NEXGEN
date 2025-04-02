import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table, FormGroup, Label, Input, Button } from "reactstrap";
import { useRouter } from "next/router";

const JobApplications = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [jobApplications, setJobApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    category: "",
    workingHours: "",
  });
  const [error, setError] = useState(""); // Added for error handling

  // Check if the user is a Superadmin or Admin
  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await fetch("/api/check-role", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok && (data.role === "superadmin" || data.role === "admin")) {
          setIsAuthorized(true);
        } else {
          router.push(`/signin?callbackUrl=${encodeURIComponent("/dashboard/superadmin/job-applications")}`);
        }
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error checking role:", error);
        router.push(`/signin?callbackUrl=${encodeURIComponent("/dashboard/superadmin/job-applications")}`);
      } finally {
        setIsLoading(false);
      }
    };
    checkRole();
  }, [router]);

  // Fetch job applications from the database
  useEffect(() => {
    if (isAuthorized) {
      const fetchJobApplications = async () => {
        try {
          const response = await fetch("/api/job/applications", {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          if (response.ok) {
            console.log("Frontend received applications:", data.applications);
            setJobApplications(data.applications);
            setFilteredApplications(data.applications);
          } else {
            console.error("Failed to fetch job applications:", data.message);
            setError(data.message);
          }
        } catch (error) {
          console.error("Error fetching job applications:", error);
          setError("Failed to fetch job applications. Please try again.");
        }
      };
      fetchJobApplications();
    }
  }, [isAuthorized]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters to the job applications
  useEffect(() => {
    let filtered = [...jobApplications];

    if (filters.date) {
      const selectedDate = new Date(filters.date);
      filtered = filtered.filter((app) => {
        const appDate = new Date(app.createdAt); // Updated to match database field
        return (
          appDate.getFullYear() === selectedDate.getFullYear() &&
          appDate.getMonth() === selectedDate.getMonth() &&
          appDate.getDate() === selectedDate.getDate()
        );
      });
    }

    if (filters.category) {
      filtered = filtered.filter((app) => (app.category || "N/A") === filters.category);
    }

    if (filters.workingHours) {
      filtered = filtered.filter((app) => (app.workingHours || "N/A") === filters.workingHours);
    }

    setFilteredApplications(filtered);
  }, [filters, jobApplications]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="page-title-box">
        <Container>
          <div className="row justify-content-center">
            <Col md={6}>
              <div className="text-center text-white">
                <h3 className="mb-4">Job Applications</h3>
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
            <Container>
              <Row className="justify-content-center">
                <Col xl={10} lg={12}>
                  <Card>
                    <CardBody className="p-5">
                      <h5 className="mb-4">Job Applications</h5>
                      {error && (
                        <div className="alert alert-danger text-center mb-4" role="alert">
                          {error}
                        </div>
                      )}
                      {/* Filters */}
                      <Row className="mb-4">
                        <Col md={4}>
                          <FormGroup>
                            <Label for="date">Filter by Date</Label>
                            <Input
                              type="date"
                              name="date"
                              id="date"
                              value={filters.date}
                              onChange={handleFilterChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="category">Filter by Category</Label>
                            <Input
                              type="select"
                              name="category"
                              id="category"
                              value={filters.category}
                              onChange={handleFilterChange}
                            >
                              <option value="">All Categories</option>
                              <option value="N/A">N/A</option>
                              <option value="IT">IT</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Finance">Finance</option>
                              <option value="HR">HR</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="workingHours">Filter by Working Hours</Label>
                            <Input
                              type="select"
                              name="workingHours"
                              id="workingHours"
                              value={filters.workingHours}
                              onChange={handleFilterChange}
                            >
                              <option value="">All Working Hours</option>
                              <option value="N/A">N/A</option>
                              <option value="Full-Time">Full-Time</option>
                              <option value="Part-Time">Part-Time</option>
                              <option value="Contract">Contract</option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* Job Applications Table */}
                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Applicant Name</th>
                            <th>Applicant Email</th>
                            <th>Job ID</th>
                            <th>Message</th>
                            <th>Resume</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredApplications.length > 0 ? (
                            filteredApplications.map((app, index) => (
                              <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.name}</td>
                                <td>{app.email}</td>
                                <td>{app.jobId}</td>
                                <td>{app.message}</td>
                                <td>
                                  <a href={app.resumePath} target="_blank" rel="noopener noreferrer">
                                    Download Resume
                                  </a>
                                </td>
                                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td>{app.status || "Pending"}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center">
                                No job applications found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
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

export default JobApplications;