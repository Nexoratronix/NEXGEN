import React from "react";
import  Link  from "next/link";
import { Card, CardBody, Nav } from "reactstrap";

const Pagination = () => {
  return (
    <React.Fragment>
      <Card className="mt-4" id="pagination">
        <div className="p-4 border-bottom">
          <h5 className="mb-0">Pagination</h5>
        </div>
        <CardBody className="p-4">
          <p className="text-muted">
            Pagination links indicate a series of related content exists across
            multiple pages.
          </p>

          <Nav aria-label="Page navigation example">
            <ul className="pagination job-pagination mb-0">
              <li className="page-item disabled">
                <Link className="page-link" href="#" tabIndex="-1">
                  <i className="mdi mdi-chevron-double-left fs-15"></i>
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" href="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  4
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <i className="mdi mdi-chevron-double-right fs-15"></i>
                </Link>
              </li>
            </ul>
          </Nav>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Pagination;
