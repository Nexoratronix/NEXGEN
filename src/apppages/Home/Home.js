import React from "react";
import Head from "next/head"; // Replace react-helmet with next/head
import Jobcatogaries from "../Home/jobCatogaries";
import JobList from "./JobList/jobList";
import HowItWorks from "./HowItWorks";
import Cta from "./Cta";
import Testimonal from "./Testimonal";
import Blog from "../Home/Blog";
import Client from "./Client";
import Services from "../Company/Services/Services";
import WhyChooseUs from "../Home/Whyus";
import ServicePage from "../Company/Services/ServicePage";

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Home | NEXGEN Staffing</title>
        <meta
          name="description"
          content="Discover top IT staffing solutions with NEXGEN Staffing. Hire skilled IT candidates in the US for your business needs. Fast, reliable tech talent recruitment. Contact us today!"
        />
        <meta
          name="keywords"
          content="IT staffing, hire IT candidates, IT recruitment, IT jobs in the US, tech talent solutions, US staffing agency, IT professionals, tech hiring"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="NEXGEN Staffing" />
        {/* Optional Open Graph Tags */}
        <meta property="og:title" content="IT Staffing Solutions | NEXGEN Staffing" />
        <meta
          property="og:description"
          content="Hire skilled IT candidates in the US with NEXGEN Staffing. Expert IT staffing and recruitment services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexgenstaffings.com/" />
        <meta property="og:image" content="https://nexgenstaffings.com/logo.png" />
      </Head>

      {/* <Jobcatogaries /> */}
      {/* <JobList /> */}
      <WhyChooseUs />
      <HowItWorks />
      <ServicePage />
      <Cta />
      <Testimonal />
      {/* <Blog /> */}
      {/* <Client /> */}
    </React.Fragment>
  );
};

export default Home;