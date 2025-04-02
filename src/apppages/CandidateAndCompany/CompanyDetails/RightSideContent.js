import React, { useState } from "react";
import {
  Col,
  Card,
  CardBody,
  Row,
  Input,
  Modal,
  ModalBody,
  Label,
} from "reactstrap";
import Link from "next/link";
import Image from "next/image"; // Corrected import

// Import Blog Images
import blogImage1 from "../../../assets/images/blog/img-01.jpg";
import blogImage3 from "../../../assets/images/blog/img-03.jpg";
import blogImage12 from "../../../assets/images/blog/img-12.jpg";

// Job Images (uncomment if needed)
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import jobImage4 from "../../../assets/images/featured-job/img-04.png";

const images = [blogImage1, blogImage3, blogImage12];

const RightSideContent = () => {
  // Apply Now Modal
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  // Lightbox (commented out since Lightbox import is missing)
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isGallery, setIsGallery] = useState(false);

  return (
    <React.Fragment>
      {/* Uncomment Lightbox when you add the package */}
      {/* {isGallery ? (
        <Lightbox
          open={isGallery}
          close={() => setIsGallery(false)}
          index={photoIndex}
          slides={images.map((image) => ({ src: image }))}
        />
      ) : null} */}
      <Col lg={8}>
        <Card className="ms-lg-4 mt-4 mt-lg-0">
          <CardBody className="p-4">
            <div className="mb-5">
              <h6 className="fs-17 fw-medium mb-4">About Company</h6>
              <p className="text-muted">
                At NEXGEN Staffing, we’re more than just an IT firm—we’re your partner in building a smarter, stronger future. Based in the Chicago area, we deliver world-class IT staffing, managed services, and outsourcing solutions designed to meet the unique needs of businesses everywhere. Our team sources and deploys top-tier IT professionals—from software developers and cloud engineers to network architects and helpdesk experts—ensuring your projects thrive with the right talent at the right time.
              </p>
              <p className="text-muted">
                We take pride in our ability to streamline operations, cut costs, and elevate quality through flexible onshore and offshore services. Whether it’s full IT outsourcing, custom software development, or strategic IT advisory, we bring expertise, integrity, and a client-first mindset to every engagement. With NEXGEN Staffing, you’re not just keeping up—you’re staying ahead.
              </p>
            </div>
            <div className="candidate-portfolio mb-5">
              <h6 className="fs-17 fw-medium mb-4">Gallery</h6>
              <Row className="g-3">
                <Col lg={6}>
                  <Link href="/" className="image-popup">
                    <Image
                      src={blogImage1}
                      alt="Blog Image 1"
                      width={300} // Added width
                      height={200} // Added height
                      className="img-fluid"
                      onClick={() => {
                        setIsGallery(true);
                        setPhotoIndex(0);
                      }}
                    />
                  </Link>
                </Col>
                <Col lg={6}>
                  <Link href="/" className="image-popup">
                    <Image
                      src={blogImage3}
                      alt="Blog Image 3"
                      width={300} // Added width
                      height={200} // Added height
                      className="img-fluid"
                      onClick={() => {
                        setIsGallery(true);
                        setPhotoIndex(1);
                      }}
                    />
                  </Link>
                </Col>
                <Col lg={12}>
                  <Link href="/" className="image-popup">
                    <Image
                      src={blogImage12}
                      alt="Blog Image 12"
                      width={600} // Added width
                      height={400} // Added height
                      className="img-fluid"
                      onClick={() => {
                        setIsGallery(true);
                        setPhotoIndex(2);
                      }}
                    />
                  </Link>
                </Col>
              </Row>
            </div>

            {/* Uncomment and fix this section if needed */}
            {/* <div>
              <h6 className="fs-17 fw-medium mb-4">Current Opening</h6>
              {jobVacancyPost.map((jobVacancyPostDetails, key) => (
                <div
                  key={key}
                  className={
                    jobVacancyPostDetails.addclassNameBookmark
                      ? "job-box bookmark-post card mt-4"
                      : "job-box card mt-4"
                  }
                >
                  <div className="p-4">
                    <Row>
                      <Col lg={1}>
                        <Link href="/companydetails">
                          <Image
                            src={jobVacancyPostDetails.companyImg}
                            alt=""
                            width={50}
                            height={50}
                            className="img-fluid rounded-3"
                          />
                        </Link>
                      </Col>
                      <Col lg={10}>
                        <div className="mt-3 mt-lg-0">
                          <h5 className="fs-17 mb-1">
                            <Link href="/jobdetails" className="text-dark">
                              {jobVacancyPostDetails.jobDescription}
                            </Link>{" "}
                            <small className="text-muted fw-normal">
                              ({jobVacancyPostDetails.experience})
                            </small>
                          </h5>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                {jobVacancyPostDetails.companyName}
                              </p>
                            </li>
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                <i className="mdi mdi-map-marker"></i>
                                {jobVacancyPostDetails.location}
                              </p>
                            </li>
                            <li className="list-inline-item">
                              <p className="text-muted fs-14 mb-0">
                                <i className="uil uil-wallet"></i>{" "}
                                {jobVacancyPostDetails.salary}
                              </p>
                            </li>
                          </ul>
                          <div className="mt-2">
                            <span
                              className={
                                jobVacancyPostDetails.fullTime
                                  ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                                  : jobVacancyPostDetails.partTime
                                  ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                                  : jobVacancyPostDetails.freeLance
                                  ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                                  : jobVacancyPostDetails.internship
                                  ? "badge bg-info-subtle text-info mt-1"
                                  : ""
                              }
                            >
                              {jobVacancyPostDetails.timing}
                            </span>
                            {(jobVacancyPostDetails.badges || []).map(
                              (badgeInner, key) => (
                                <span
                                  className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                                  key={key}
                                >
                                  {badgeInner.badgeName}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="favorite-icon">
                      <Link href="#">
                        <i className="uil uil-heart-alt fs-18"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="p-3 bg-light">
                    <div className="row justify-content-between">
                      <Col md={8}>
                        <div>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <i className="uil uil-tag"></i> Keywords :
                            </li>
                            <li className="list-inline-item">
                              <Link href="#" className="primary-link text-muted">
                                Ui designer
                              </Link>
                              ,
                            </li>
                            <li className="list-inline-item">
                              <Link href="#" className="primary-link text-muted">
                                developer
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="text-md-end">
                          <Link
                            href="#applyNow"
                            onClick={openModal}
                            className="primary-link"
                          >
                            Apply Now{" "}
                            <i className="mdi mdi-chevron-double-right"></i>
                          </Link>
                        </div>
                      </Col>
                    </div>
                  </div>
                </div>
              ))}
              <Modal isOpen={modal} toggle={openModal} centered>
                <ModalBody className="p-5">
                  <div className="text-center mb-4">
                    <h5 className="modal-title">Apply For This Job</h5>
                  </div>
                  <div className="position-absolute end-0 top-0 p-3">
                    <button
                      type="button"
                      onClick={openModal}
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="mb-3">
                    <Label for="nameControlInput" className="form-label">
                      Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="nameControlInput"
                      placeholder="Enter your name"
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
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <Label for="messageControlTextarea" className="form-label">
                      Message
                    </Label>
                    <textarea
                      className="form-control"
                      id="messageControlTextarea"
                      rows="4"
                      placeholder="Enter your message"
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
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Application
                  </button>
                </ModalBody>
              </Modal>
            </div> */}
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RightSideContent;