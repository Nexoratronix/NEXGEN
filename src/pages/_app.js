import CommonLayout from '../../src/Layout/CommonLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../index.css';
import '../assets/scss/app.scss';
import '../assets/scss/bootstrap.scss';
import '../assets/scss/icons.scss';
import '../assets/scss/themes.scss';
import '../assets/scss/_variables.scss';
import '../assets/scss/_variables-dark.scss';
import Head from 'next/head';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, createContext } from 'react';
import useLoadingStore from '@/store/loading';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext({ auth: null, setAuth: () => {} });

function MyApp({ Component, pageProps, authFromServer }) {
  const { isLoading, setIsLoading } = useLoadingStore();
  const [auth, setAuth] = useState(authFromServer); // Initialize from server

  useEffect(() => {
    // if (typeof window === "undefined") return; 

    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];
    
    if (accessToken && !auth) { // Only update if auth isn’t already set
      try {
        const decoded = jwt.verify(accessToken, process.env.NEXTAUTH_SECRET);
        setAuth(decoded);
      } catch (error) {
        console.error('Failed to verify token:', error);
        setAuth(null);
      }
    }
  }, [auth, setAuth]);

      // Render logic
  if (typeof window === "undefined") {
    return (
     <p>appp </p>
    );
  }
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <CommonLayout>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} />
        </CommonLayout>
      </AuthContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  let authFromServer = null;
  if (ctx.req) { // Server-side
    const cookies = ctx.req.headers.cookie;
    if (cookies) {
      const accessToken = cookies
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      if (accessToken) {
        try {
          authFromServer = jwt.verify(accessToken, process.env.NEXTAUTH_SECRET);
        } catch (error) {
          console.error('Server-side token verification failed:', error);
        }
      }
    }
  }
  return { authFromServer };
};

export default MyApp;