import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

// Swiper CSS
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/pagination";
import "swiper/css/autoplay";


import ITStaffing from "../../assets/images/logo/itstaffing.jpeg"; 
import CloudIcon from "../../assets/images/logo/cloudtestimonial.png"; 
import SupportIcon from "../../assets/images/logo/itsupport.png"; 

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image: ITStaffing,
      content:
        "Their team provided us with top-notch developers in record time. Clear communication, precise milestones, and a seamless integration into our workflow made all the difference.",
      name: "Michael Reynolds",
      // occupation: "IT Director",
    },
    {
      id: 2,
      image: CloudIcon,
      content:
        "The cloud migration was flawless—fast, secure, and tailored href our needs. Their expertise in AWS saved us time and resources while boosting performance.",
      name: "Sarah Thompson",
      // occupation: "Operations Manager",
    },
    {
      id: 3,
      image: SupportIcon,
      content:
        "Their 24/7 support team resolved a critical issue in minutes, keeping our systems online during a peak period. Professional, patient, and reliable every step of the way.",
      name: "David Patel",
      // occupation: "Business Owner",
    },
  ];

  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="section-title text-center mb-4 pb-2">
                <h3 className="title mb-3 myheading">Satisfied Clients</h3>
                <p className="text-muted">
                  Discover how our IT solutions—staffing, software, and support—drive success for businesses like yours.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Swiper
                className="pb-5"
                loop={true}
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
              >
                <div className="swiper-wrapper">
                  {(testimonials || []).map((testimonialDetails, key) => (
                    <SwiperSlide key={key}>
                      <Card className="testi-box">
                        <CardBody>
                          <div className="mb-4">
                            <Image
                              src={testimonialDetails.image}
                              height="100"
                              width="100"
                              alt=""
                              style={{height:"4rem", width:"5rem"}}
                            />
                          </div>
                          <p className="testi-content lead text-muted mb-4">
                            {testimonialDetails.content}
                          </p>
                          <h5 className="mb-0">{testimonialDetails.name}</h5>
                          <p className="text-muted mb-0">
                            {testimonialDetails.occupation}
                          </p>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Testimonial;