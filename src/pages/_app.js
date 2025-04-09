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

export const AuthContext = createContext({ auth: null, setAuth: () => {} });

function AuthWrapper({ children }) {
  const { isLoading, setIsLoading } = useLoadingStore();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Skip on server

    setIsLoading(true);
    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1];
    
    if (accessToken) {
      try {
        const decoded = require('jsonwebtoken').verify(accessToken, process.env.NEXTAUTH_SECRET);
        setAuth(decoded);
      } catch (error) {
        console.error('Failed to verify token:', error);
        setAuth(null);
      }
    }
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <AuthWrapper>
        <CommonLayout>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} />
        </CommonLayout>
      </AuthWrapper>
    </>
  );
}