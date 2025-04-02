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
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon2.png" />
      </Head>
      <CommonLayout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </CommonLayout>
    </>
  );
}