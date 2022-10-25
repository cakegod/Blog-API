import '../styles/global.css';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <ThemeProvider attribute='class' enableSystem={true}>
        <Head>
          <title>Cake's Blog</title>
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          ></meta>
        </Head>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
      <Footer />
    </div>
  );
}

export default MyApp;
