// src/Layout/CommonLayout.js
import React, { useContext } from "react";
import dynamic from "next/dynamic";

import useLoadingStore from "@/store/loading";
import { Container } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import darkLogo from "../assets/images/logo/logo.png";
import { AuthContext } from "@/pages/_app";
import TopBar from "./CommonLayout/TopBar";
import NavBar from "./CommonLayout/NavBar";

 

// const NavBar = dynamic(() => import("./CommonLayout/NavBar"), {
//   ssr: false,
//   loading: () => <div>Loading NavBar...</div>,
// });

// const TopBar = dynamic(() => import("./CommonLayout/TopBar"), {
//   ssr: false,
//   loading: () => <div>Loading TopBar...</div>,
// });
const Footer = dynamic(()=>import('./CommonLayout/Footer'),{
  ssr: false,
  loading: () => <div>Loading footer...</div>,
} )


const CommonLayout = ({ children }) => {
  const { isLoading } = useLoadingStore();
  const { auth } = useContext(AuthContext) || { auth: null }; 


  return (
    <div>
      <TopBar />
      <NavBar />
      {children}
      <Footer/>
    </div>
  );
};

export default CommonLayout;