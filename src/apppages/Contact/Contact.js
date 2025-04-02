import React from "react";
import Section from "../Contact/Section";
import ContactContent from "../Contact/ContactContent";
import Head from "next/head";

const Contact = () => {
  // document.title = "Contact | NEXGEN Staffing";
  <Head>
        <title>Contact [Your Company Name] | IT Staffing & Recruitment in the US</title>
        <meta name="description" content="Contact NEXGEN Staffing for expert IT staffing in the US. Hire IT candidates today! Reach us via phone, email, or form for fast tech talent solutions." />
        <meta name="keywords" content="contact IT staffing, hire IT candidates, IT recruitment agency, IT jobs in the US, tech talent solutions, US staffing agency" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NEXGEN Staffing" />
        <meta property="og:title" content="Contact NEXGEN Staffing" />
        <meta property="og:description" content="Get in touch with NEXGEN Staffing for IT staffing solutions in the US. Hire top tech talent now!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexgenstaffings.com/contact" />
        <meta property="og:image" content="https://nexgenstaffings.com/contact-image.jpg" />
      </Head>
  return (
    <React.Fragment>
      <Section />
      <ContactContent />
    </React.Fragment>
  );
};

export default Contact;
