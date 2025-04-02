
// // export default JobVacancy2;
// import React, { useState, useEffect } from "react";
// import { Col, Modal, ModalBody, Input, Label } from "reactstrap";
// import Link from "next/link";
// import useLoadingStore from "@/store/loading";
// import { Spinner } from "reactstrap";

// // List of available icons
// const jobIcons = [
//   "/job-icons/developer1.png",
//   "/job-icons/developer2.png",
//   "/job-icons/developer3.png",

// ];

// // Function to get a random icon
// const getRandomIcon = () => {
//   const randomIndex = Math.floor(Math.random() * jobIcons.length);
//   return jobIcons[randomIndex];
// };

// const JobVacancy2 = () => {
//   const [modal, setModal] = useState(false);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const { isLoading, setLoading } = useLoadingStore();
//   const [jobs, setJobs] = useState([]); // State to store fetched jobs
//   const [fetchError, setFetchError] = useState("");

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await fetch("/api/job/fetch");
//         const data = await response.json();
//         if (response.ok) {
//           // Add a random icon to each job
//           const jobsWithIcons = data.map((job) => ({
//             ...job,
//             icon: getRandomIcon(),
//           }));
//           setJobs(jobsWithIcons);
//         } else {
//           setFetchError(data.message || "Failed to fetch jobs.");
//         }
//       } catch (err) {
//         setFetchError("Failed to fetch jobs. Please try again.");
//       }
//     };
//     fetchJobs();
//   }, []);

//   const openModal = (jobId) => {
//     setSelectedJobId(jobId);
//     setModal(true);
//     setMessage("");
//     setError("");
//   };

//   const closeModal = () => {
//     setModal(false);
//     setSelectedJobId(null);
//     setMessage("");
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     setLoading(true);

//     const formData = new FormData(e.target);
//     formData.append("jobId", selectedJobId);

//     try {
//       const response = await fetch("/api/job/apply", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message);
//         setTimeout(() => {
//           closeModal();
//         }, 2000);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Failed to submit application. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <section className="job-section py-5">
//         <div className="container text-center">
//           <h2 className="myheading">
//             IT Job Opportunities with{" "}
//             <span className="text-primary">NEXGEN Staffing</span>
//           </h2>
//           <p className="mt-4 text-secondary fs-5">
//             Are you an IT professional looking for your next big opportunity in
//             the US? At{" "}
//             <span className="text-warning fw-bold">NEXGEN Staffing</span>, we’re
//             passionate about connecting talented individuals like you with
//             rewarding IT jobs across the United States.
//           </p>
//           <p className="text-secondary fs-6">
//             As a leading IT staffing agency, we partner with top companies to
//             offer a wide range of career opportunities, from{" "}
//             <span className="fw-semibold">software development</span> to{" "}
//             <span className="fw-semibold">cybersecurity</span>,{" "}
//             <span className="fw-semibold">cloud engineering</span> to{" "}
//             <span className="fw-semibold">data analysis</span>. Explore our
//             current openings and take the next step in your tech career today.
//           </p>
//         </div>
//       </section>
//       <div className="container">
//         {fetchError && <p className="text-danger text-center">{fetchError}</p>}
//         {jobs.length === 0 && !fetchError && <p className="text-center">No jobs available.</p>}
//         <div className="row">
//           {jobs.map((jobVacancy2Details, key) => (
//             <Col lg={4} md={6} className="mt-4" key={key}>
//               <div
//                 className={
//                   jobVacancy2Details.addclassNameBookmark === true
//                     ? "card job-grid-box bookmark-post"
//                     : "card job-grid-box"
//                 }
//               >
//                 <div className="card-body p-4">
//                   <div className="favorite-icon">
//                     <Link href="#">
//                       <i className="uil uil-heart-alt"></i>
//                     </Link>
//                   </div>
//                   <div>
//                     <Link href="/companydetails">
//                       <img
//                         src={jobVacancy2Details.icon}
//                         alt="Job Icon"
//                         className="img-fluid rounded-3"
//                         style={{ width: "64px", height: "64px" }}
//                       />
//                     </Link>
//                   </div>
//                   <div className="mt-4">
//                     <Link href="/jobdetails" className="primary-link">
//                       <h5 className="fs-17 mb-1">
//                         {jobVacancy2Details.jobDescription}
//                       </h5>
//                     </Link>
//                     <p className="text-muted">{jobVacancy2Details.companyName}</p>
//                     <p className="text-muted">Job ID: {jobVacancy2Details.jobId}</p>
//                     <ul className="list-inline">
//                       <li className="list-inline-item">
//                         <span className="badge bg-success-subtle text-success fs-13 mt-1">
//                           {jobVacancy2Details.salary}
//                         </span>
//                       </li>
//                       <li className="list-inline-item">
//                         <span className="badge bg-primary-subtle text-primary fs-13 mt-1">
//                           {jobVacancy2Details.experience}
//                         </span>
//                       </li>
//                       <li className="list-inline-item">
//                         <span className="badge bg-info-subtle text-info fs-13 mt-1">
//                           {jobVacancy2Details.jobType}
//                         </span>
//                       </li>
//                       <li className="list-inline-item">
//                         <span className="badge bg-warning-subtle text-warning fs-13 mt-1">
//                           Openings: {jobVacancy2Details.numberOfOpenings}
//                         </span>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="job-grid-content mt-3">
//                     <p className="text-muted">{jobVacancy2Details.jobDetails}</p>
//                     <div className="d-flex align-items-center justify-content-between mt-4 border-top pt-3">
//                       <p className="text-muted float-start mb-0">
//                         {new Date(jobVacancy2Details.jobTimeDate).toLocaleString()}
//                       </p>
//                       <div className="text-end">
//                         <button
//                           onClick={() => openModal(jobVacancy2Details.id)}
//                           className="btn btn-sm btn-primary"
//                         >
//                           Apply Now <i className="uil uil-angle-right-b"></i>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           ))}
//         </div>
//       </div>
//       <div
//         className="modal fade"
//         id="applyNow"
//         tabIndex="-1"
//         aria-labelledby="applyNow"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <Modal isOpen={modal} toggle={closeModal} centered>
//             <ModalBody className="modal-body p-5">
//               <div className="text-center mb-4">
//                 <h5 className="modal-title" id="staticBackdropLabel">
//                   Apply For This Job
//                 </h5>
//               </div>
//               <div className="position-absolute end-0 top-0 p-3">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div
//                 className={`message-container ${message || error ? "show" : "hide"
//                   }`}
//                 style={{ marginBottom: "1rem" }}
//               >
//                 {message && (
//                   <p className="text-success text-center">{message}</p>
//                 )}
//                 {error && <p className="text-danger text-center">{error}</p>}
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <Label for="nameControlInput" className="form-label">
//                     Name
//                   </Label>
//                   <Input
//                     type="text"
//                     className="form-control"
//                     id="nameControlInput"
//                     name="name"
//                     placeholder="Enter your name"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <Label for="emailControlInput2" className="form-label">
//                     Email Address
//                   </Label>
//                   <Input
//                     type="email"
//                     className="form-control"
//                     id="emailControlInput2"
//                     name="email"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <Label for="messageControlTextarea" className="form-label">
//                     Message
//                   </Label>
//                   <textarea
//                     className="form-control"
//                     id="messageControlTextarea"
//                     name="message"
//                     rows="4"
//                     placeholder="Enter your message"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="mb-4">
//                   <Label className="form-label" for="inputGroupFile01">
//                     Resume Upload
//                   </Label>
//                   <Input
//                     type="file"
//                     className="form-control"
//                     id="inputGroupFile01"
//                     name="resume"
//                     accept=".pdf,.doc,.docx"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? <Spinner size="sm" /> : "Send Application"}
//                 </button>
//               </form>
//             </ModalBody>
//           </Modal>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default JobVacancy2;
import React, { useState, useEffect } from "react";
import { Col, Modal, ModalBody, Input, Label } from "reactstrap";
import Link from "next/link";
import useLoadingStore from "@/store/loading";
import { Spinner } from "reactstrap";

const jobIcons = [
  "/job-icons/developer1.png",
  "/job-icons/developer2.png",
  "/job-icons/developer3.png",
];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * jobIcons.length);
  return jobIcons[randomIndex];
};

const JobVacancy2 = () => {
  const [modal, setModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // Store full job object
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { isLoading, setLoading } = useLoadingStore();
  const [jobs, setJobs] = useState([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/job/fetch");
        const data = await response.json();
        if (response.ok) {
          const jobsWithIcons = data.map((job) => ({
            ...job,
            icon: getRandomIcon(),
          }));
          setJobs(jobsWithIcons);
        } else {
          setFetchError(data.message || "Failed to fetch jobs.");
        }
      } catch (err) {
        setFetchError("Failed to fetch jobs. Please try again.");
      }
    };
    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job); // Store the full job object
    setModal(true);
    setMessage("");
    setError("");
  };

  const closeModal = () => {
    setModal(false);
    setSelectedJob(null);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("jobId", selectedJob.jobId); // Use the custom jobId

    try {
      const response = await fetch("/api/job/apply", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section className="job-section py-5">
        <div className="container text-center">
          <h2 className="myheading">
            IT Job Opportunities with{" "}
            <span className="text-primary">NEXGEN Staffing</span>
          </h2>
          <p className="mt-4 text-secondary fs-5">
            Are you an IT professional looking for your next big opportunity in
            the US? At{" "}
            <span className="text-warning fw-bold">NEXGEN Staffing</span>, we’re
            passionate about connecting talented individuals like you with
            rewarding IT jobs across the United States.
          </p>
          <p className="text-secondary fs-6">
            As a leading IT staffing agency, we partner with top companies to
            offer a wide range of career opportunities, from{" "}
            <span className="fw-semibold">software development</span> to{" "}
            <span className="fw-semibold">cybersecurity</span>,{" "}
            <span className="fw-semibold">cloud engineering</span> to{" "}
            <span className="fw-semibold">data analysis</span>. Explore our
            current openings and take the next step in your tech career today.
          </p>
        </div>
      </section>
      <div className="container">
        {fetchError && <p className="text-danger text-center">{fetchError}</p>}
        {jobs.length === 0 && !fetchError && <p className="text-center">No jobs available.</p>}
        <div className="row">
          {jobs.map((jobVacancy2Details, key) => (
            <Col lg={4} md={6} className="mt-4" key={key}>
              <div
                className={
                  jobVacancy2Details.addclassNameBookmark === true
                    ? "card job-grid-box bookmark-post"
                    : "card job-grid-box"
                }
              >
                <div className="card-body p-4">
                  <div className="favorite-icon">
                    <Link href="#">
                      <i className="uil uil-heart-alt"></i>
                    </Link>
                  </div>
                  <div>
                    <Link href="/companydetails">
                      <img
                        src={jobVacancy2Details.icon}
                        alt="Job Icon"
                        className="img-fluid rounded-3"
                        style={{ width: "64px", height: "64px" }}
                      />
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Link href="/jobdetails" className="primary-link">
                      <h5 className="fs-17 mb-1">
                        {jobVacancy2Details.jobDescription}
                      </h5>
                    </Link>
                    <p className="text-muted">{jobVacancy2Details.companyName}</p>
                    <p className="text-muted">Job ID: {jobVacancy2Details.jobId}</p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <span className="badge bg-success-subtle text-success fs-13 mt-1">
                          {jobVacancy2Details.salary}
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span className="badge bg-primary-subtle text-primary fs-13 mt-1">
                          {jobVacancy2Details.experience}
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span className="badge bg-info-subtle text-info fs-13 mt-1">
                          {jobVacancy2Details.jobType}
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span className="badge bg-warning-subtle text-warning fs-13 mt-1">
                          Openings: {jobVacancy2Details.numberOfOpenings}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="job-grid-content mt-3">
                    <p className="text-muted">{jobVacancy2Details.jobDetails}</p>
                    <div className="d-flex align-items-center justify-content-between mt-4 border-top pt-3">
                      <p className="text-muted float-start mb-0">
                        {new Date(jobVacancy2Details.jobTimeDate).toLocaleString()}
                      </p>
                      <div className="text-end">
                        <button
                          onClick={() => openModal(jobVacancy2Details)}
                          className="btn btn-sm btn-primary"
                        >
                          Apply Now <i className="uil uil-angle-right-b"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </div>
      </div>
      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal isOpen={modal} toggle={closeModal} centered>
            <ModalBody className="modal-body p-5">
              <div className="text-center mb-4">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Apply For This Job
                </h5>
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
              <div
                className={`message-container ${message || error ? "show" : "hide"}`}
                style={{ marginBottom: "1rem" }}
              >
                {message && (
                  <p className="text-success text-center">{message}</p>
                )}
                {error && <p className="text-danger text-center">{error}</p>}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Label for="jobIdControlInput" className="form-label">
                    Job ID
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="jobIdControlInput"
                    name="jobId"
                    value={selectedJob?.jobId || ""}
                    readOnly // Makes it unchangeable
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label for="nameControlInput" className="form-label">
                    Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="nameControlInput"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label for="emailControlInput2" className="form-label">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="emailControlInput2"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label for="messageControlTextarea" className="form-label">
                    Message
                  </Label>
                  <textarea
                    className="form-control"
                    id="messageControlTextarea"
                    name="message"
                    rows="4"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <Label className="form-label" for="inputGroupFile01">
                    Resume Upload
                  </Label>
                  <Input
                    type="file"
                    className="form-control"
                    id="inputGroupFile01"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="sm" /> : "Send Application"}
                </button>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobVacancy2;