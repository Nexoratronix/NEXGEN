// src/pages/Company/AboutUs/AboutUs.js
import React from "react";
import Head from "next/head"; 
import About from "./About";
import Section from "./Section";
import Counter from "./Counter";
import Features from "./Features";
import Cta from "./Cta";
import CompanyTestimonal from "./CompanyTestimonal";
// import Team from "../Team/Team"; // Commented out
import CompanyDetails from "../../CandidateAndCompany/CompanyDetails/CompanyDetails";

const AboutUs = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Us | NEXGEN Staffing</title>
        <meta
          name="description"
          content="Learn about NEXGEN Staffing, a top IT staffing agency in the US. We connect businesses with skilled IT candidates. Discover our mission, team, and values today!"
        />
        <meta
          name="keywords"
          content="IT staffing agency, about us, hire IT candidates, tech talent solutions, IT recruitment, IT jobs in the US, US tech staffing"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NEXGEN Staffing" />
        <meta property="og:title" content="About NEXGEN Staffing" />
        <meta
          property="og:description"
          content="Meet NEXGEN Staffing, your US-based IT staffing experts. Learn about our mission and team."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexgenstaffings.com/about" />
        <meta property="og:image" content="https://nexgenstaffings.com/about-image.jpg" />
      </Head>
      <Section />
      <About />
      <CompanyDetails />
      <Counter />
      <Features />
      {/* <Team /> */}
      <Cta />
      <CompanyTestimonal />
    </React.Fragment>
  );
};

export default AboutUs;