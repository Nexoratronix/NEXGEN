import React from "react";
import { Container } from "reactstrap";
import CompanyDetails from "./CompanyDetails";
import Section from "./Section";

const CompanyList = () => {
  document.title = "Company List | NEXGEN Staffing - Job Listing Template | Themesdesign";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <CompanyDetails />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default CompanyList;
