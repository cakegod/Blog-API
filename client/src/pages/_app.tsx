import './styles/global.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title></title>
        <meta></meta>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
