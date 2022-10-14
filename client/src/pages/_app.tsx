import './styles/global.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute='class'>
      <Head>
        <title></title>
        <meta></meta>
      </Head>
      <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
