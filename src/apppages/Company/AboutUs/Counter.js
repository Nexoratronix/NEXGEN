import React from "react";
import { Container, Row, Col } from "reactstrap";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <React.Fragment>
      <section className="section bg-light">
        <Container>
          <Row>
            <Col lg={3} md={6}>
              <div className="counter-box mt-3">
                <div className="counters counter_custom text-center">
                  <CountUp
                    end={500}
                    duration={1}
                    className="counter mb-0"
                  ></CountUp>
                  <h6 className="fs-16 mt-3">IT Professionals Deployed</h6>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="counter-box mt-3">
                <div className="counters counter_custom text-center">
                  <CountUp
                    end={300}
                    duration={1}
                    className="counter mb-0"
                  ></CountUp>
                  <h6 className="fs-16 mt-3">Custom Projects Delivered</h6>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="counter-box mt-3">
                <div className="counters counter_custom text-center">
                  <CountUp
                    end={99.9}
                    decimals={1}
                    duration={1}
                    className="counter mb-0"
                  ></CountUp>
                  <h6 className="fs-16 mt-3">Uptime Guaranteed (%)</h6>
                </div>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="counter-box mt-3">
                <div className="counters counter_custom text-center">
                  <CountUp
                    end={450}
                    duration={1}
                    className="counter mb-0"
                  ></CountUp>
                  <h6 className="fs-16 mt-3">Businesses Supported</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Counter;
