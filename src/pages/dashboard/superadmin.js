import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalBody, Input, Label, Spinner, Table } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const SuperadminDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [modal, setModal] = useState(false); // State for post job modal
  const [editModal, setEditModal] = useState(false); // State for edit job modal
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const [fetchError, setFetchError] = useState("");
  const [formData, setFormData] = useState({
    jobId: "",
    jobDescription: "",
    experience: "",
    companyName: "NEXGEN Staffing Technology Pvt.Ltd",
    jobType: "",
    salary: "",
    jobDetails: "",
    numberOfOpenings: "",
  });
  const [editFormData, setEditFormData] = useState(null); // State for editing job
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch jobs on component mount
  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await fetch("/api/check-role", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok && data.role === "superadmin") {
          setIsAuthorized(true);
          fetchJobs(); // Fetch jobs after authorization
        } else {
          router.push(`/signin?callbackUrl=${encodeURIComponent("/dashboard/superadmin")}`);
        }
      } catch (error) {
        router.push(`/signin?callbackUrl=${encodeURIComponent("/dashboard/superadmin")}`);
      } finally {
        setIsLoading(false);
      }
    };
    checkRole();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/job/fetch", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data);
      } else {
        setFetchError(data.message || "Failed to fetch jobs.");
      }
    } catch (err) {
      setFetchError("Failed to fetch jobs. Please try again.");
    }
  };

  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    setFormData({
      jobId: "",
      jobDescription: "",
      experience: "",
      companyName: "NEXGEN Staffing Technology Pvt.Ltd",
      jobType: "",
      salary: "",
      jobDetails: "",
      numberOfOpenings: "",
    });
    setMessage("");
    setError("");
  };

  const openEditModal = (job) => {
    setEditFormData(job);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditFormData(null);
    setMessage("");
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitLoading(true);

    try {
      const response = await fetch("/api/job/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, jobTimeDate: new Date().toISOString() }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Job posted successfully!");
        fetchJobs(); // Refresh job list
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setError(data.message || "Failed to post job.");
      }
    } catch (err) {
      setError("Failed to post job. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitLoading(true);

    try {
      const response = await fetch("/api/job/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editFormData }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Job updated successfully!");
        fetchJobs(); // Refresh job list
        setTimeout(() => {
          closeEditModal();
        }, 2000);
      } else {
        setError(data.message || "Failed to update job.");
      }
    } catch (err) {
      setError("Failed to update job. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch("/api/job/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Job deleted successfully!");
        fetchJobs(); // Refresh job list
      } else {
        setError(data.message || "Failed to delete job.");
      }
    } catch (err) {
      setError("Failed to delete job. Please try again.");
    }
  };

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
                <h3 className="mb-4">Superadmin Dashboard</h3>
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
                        <h5>You are at the Superadmin Dashboard</h5>
                        <div>
                          <Button className="btn btn-primary me-2" onClick={openModal}>
                            Post Job
                          </Button>
                          <Link href="/update-profile">
                            <Button className="btn btn-primary me-2">Update Profile</Button>
                          </Link>
                          <Link href="/dashboard/job-applications">
                            <Button className="btn btn-primary">View Job Applications</Button>
                          </Link>
                        </div>
                      </div>
                      <p className="mt-3">
                        Welcome to the Superadmin Dashboard! You have full access to manage the system.
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              {/* Job List Table */}
              <Row className="justify-content-center mt-4">
                <Col xl={10} lg={12}>
                  <Card>
                    <CardBody className="p-5">
                      <h5>Manage Jobs</h5>
                      {fetchError && <p className="text-danger">{fetchError}</p>}
                      {message && <p className="text-success">{message}</p>}
                      {error && <p className="text-danger">{error}</p>}
                      {jobs.length === 0 ? (
                        <p>No jobs available.</p>
                      ) : (
                        <Table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Job ID</th>
                              <th>Job Title</th>
                              <th>Company</th>
                              <th>Salary</th>
                              <th>Experience</th>
                              <th>Job Type</th>
                              <th>Openings</th>
                              <th>Posted On</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jobs.map((job) => (
                              <tr key={job.id}>
                                <td>{job.jobId}</td>
                                <td>{job.jobDescription}</td>
                                <td>{job.companyName}</td>
                                <td>{job.salary}</td>
                                <td>{job.experience}</td>
                                <td>{job.jobType}</td>
                                <td>{job.numberOfOpenings}</td>
                                <td>{new Date(job.jobTimeDate).toLocaleString()}</td>
                                <td>
                                  <Button
                                    color="primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => openEditModal(job)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    color="danger"
                                    size="sm"
                                    onClick={() => handleDelete(job.id)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>

      {/* Modal for Posting Job */}
      <Modal isOpen={modal} toggle={closeModal} centered>
        <ModalBody className="p-5">
          <div className="text-center mb-4">
            <h5 className="modal-title">Post a New Job</h5>
          </div>
          <div className="position-absolute end-0 top-0 p-3">
            <button
              type="button"
              onClick={closeModal}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className={`message-container ${message || error ? "show" : "hide"}`} style={{ marginBottom: "1rem" }}>
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label for="jobId" className="form-label">Job ID</Label>
              <Input
                type="text"
                className="form-control"
                id="jobId"
                name="jobId"
                value={formData.jobId}
                onChange={handleInputChange}
                placeholder="Enter unique job ID (e.g., JOB001)"
                required
              />
            </div>
            <div className="mb-3">
              <Label for="jobDescription" className="form-label">Job Title</Label>
              <Input
                type="text"
                className="form-control"
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Enter job title (e.g., Magento Developer)"
                required
              />
            </div>
            <div className="mb-3">
              <Label for="experience" className="form-label">Experience</Label>
              <Input
                type="text"
                className="form-control"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Enter experience (e.g., Min. 1 Year)"
                required
              />
            </div>
            <div className="mb-3">
              <Label for="companyName" className="form-label">Company Name</Label>
              <Input
                type="text"
                className="form-control"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="mb-3">
              <Label for="jobType" className="form-label">Job Type</Label>
              <Input
                type="text"
                className="form-control"
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                placeholder="Enter job type (e.g., Developer)"
                required
              />
            </div>
            <div className="mb-3">
              <Label for="salary" className="form-label">Salary</Label>
              <Input
                type="text"
                className="form-control"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Enter salary (e.g., $500/Month)"
                required
              />
            </div>
            <div className="mb-3">
              <Label for="jobDetails" className="form-label">Job Details</Label>
              <textarea
                className="form-control"
                id="jobDetails"
                name="jobDetails"
                value={formData.jobDetails}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter job details"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <Label for="numberOfOpenings" className="form-label">Number of Openings</Label>
              <Input
                type="number"
                className="form-control"
                id="numberOfOpenings"
                name="numberOfOpenings"
                value={formData.numberOfOpenings}
                onChange={handleInputChange}
                placeholder="Enter number of openings (e.g., 5)"
                min="1"
                required
              />
            </div>
            <Button type="submit" className="btn btn-primary w-100" disabled={submitLoading}>
              {submitLoading ? <Spinner size="sm" /> : "Post Job"}
            </Button>
          </form>
        </ModalBody>
      </Modal>

      {/* Modal for Editing Job */}
      <Modal isOpen={editModal} toggle={closeEditModal} centered>
        <ModalBody className="p-5">
          <div className="text-center mb-4">
            <h5 className="modal-title">Edit Job</h5>
          </div>
          <div className="position-absolute end-0 top-0 p-3">
            <button
              type="button"
              onClick={closeEditModal}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className={`message-container ${message || error ? "show" : "hide"}`} style={{ marginBottom: "1rem" }}>
            {message && <p className="text-success text-center">{message}</p>}
            {error && <p className="text-danger text-center">{error}</p>}
          </div>
          {editFormData && (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <Label for="jobId" className="form-label">Job ID</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="jobId"
                  name="jobId"
                  value={editFormData.jobId}
                  onChange={handleEditInputChange}
                  placeholder="Enter unique job ID (e.g., JOB001)"
                  required
                />
              </div>
              <div className="mb-3">
                <Label for="jobDescription" className="form-label">Job Title</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="jobDescription"
                  name="jobDescription"
                  value={editFormData.jobDescription}
                  onChange={handleEditInputChange}
                  placeholder="Enter job title (e.g., Magento Developer)"
                  required
                />
              </div>
              <div className="mb-3">
                <Label for="experience" className="form-label">Experience</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="experience"
                  name="experience"
                  value={editFormData.experience}
                  onChange={handleEditInputChange}
                  placeholder="Enter experience (e.g., Min. 1 Year)"
                  required
                />
              </div>
              <div className="mb-3">
                <Label for="companyName" className="form-label">Company Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  value={editFormData.companyName}
                  onChange={handleEditInputChange}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="mb-3">
                <Label for="jobType" className="form-label">Job Type</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="jobType"
                  name="jobType"
                  value={editFormData.jobType}
                  onChange={handleEditInputChange}
                  placeholder="Enter job type (e.g., Developer)"
                  required
                />
              </div>
              <div className="mb-3">
                <Label for="salary" className="form-label">Salary</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="salary"
                  name="salary"
                  value={editFormData.salary}
                  onChange={handleEditInputChange}
                  placeholder="Enter salary (e.g., $500/Month)"
                  required
                />
              </div>
              <div className="mb-3">
                <Label for="jobDetails" className="form-label">Job Details</Label>
                <textarea
                  className="form-control"
                  id="jobDetails"
                  name="jobDetails"
                  value={editFormData.jobDetails}
                  onChange={handleEditInputChange}
                  rows="4"
                  placeholder="Enter job details"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <Label for="numberOfOpenings" className="form-label">Number of Openings</Label>
                <Input
                  type="number"
                  className="form-control"
                  id="numberOfOpenings"
                  name="numberOfOpenings"
                  value={editFormData.numberOfOpenings}
                  onChange={handleEditInputChange}
                  placeholder="Enter number of openings (e.g., 5)"
                  min="1"
                  required
                />
              </div>
              <Button type="submit" className="btn btn-primary w-100" disabled={submitLoading}>
                {submitLoading ? <Spinner size="sm" /> : "Update Job"}
              </Button>
            </form>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default SuperadminDashboard;