// src/Layout/CommonLayout.js
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Footer from "./CommonLayout/Footer"; // Ensure this path is correct
import useLoadingStore from "@/store/loading";
import { Container } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import darkLogo from "../assets/images/logo/logo.png";
import { AuthContext } from "@/pages/_app";


const NavBar = dynamic(() => import("./CommonLayout/NavBar"), {
  ssr: false,
  loading: () => <div>Loading NavBar...</div>,
});

const TopBar = dynamic(() => import("./CommonLayout/TopBar"), {
  ssr: false,
  loading: () => <div>Loading TopBar...</div>,
});

// Fallback Footer component if the real one is missing
const FallbackFooter = () => <footer>Footer Placeholder</footer>;

const CommonLayout = ({ children }) => {
  const { isLoading } = useLoadingStore();
  const { auth } = useContext(AuthContext) || { auth: null }; // Safe destructuring

  if (typeof window === "undefined" || isLoading) {
    return (
      <div>
        <div>Loading TopBar...</div>
        <nav className="navbar navbar-expand-lg fixed-top sticky p-0">
          <Container fluid className="custom-container">
            <Link href="/" className="navbar-brand text-dark fw-bold me-auto">
              <Image src={darkLogo} height="80" alt="" className="logo-dark" style={{ height: "6rem", width: "6rem" }} />
            </Link>
          </Container>
        </nav>
        {children}
        {/* Use FallbackFooter during SSR or loading */}
        <FallbackFooter />
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <NavBar />
      {children}
   
      {typeof window !== "undefined" ? <Footer /> : <FallbackFooter />}
    </div>
  );
};

export default CommonLayout;