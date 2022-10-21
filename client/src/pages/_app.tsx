import '../styles/global.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <ThemeProvider attribute='class'>
        <Head>
          <title></title>
          <meta></meta>
        </Head>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default MyApp;
