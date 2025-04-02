// src/Layout/CommonLayout.js
import React from "react";
// import NavBar from "../components/NavBar"; 
// import Footer from "../components/Footer"; 
// import Layout2 from "../apppages/Home/Layout2"; 
import NavBar from "./CommonLayout/NavBar";
import Footer from "./CommonLayout/Footer";
import Layout2 from "@/apppages/Home/Layout2/Layout2";
import TopBar from "./CommonLayout/TopBar";

const CommonLayout = ({ children }) => {
  return (
    <div>
      <TopBar/>
      <NavBar />
      {/* <Layout2 />  */}
      {children} 
      <Footer />
    </div>
  );
};

export default CommonLayout;