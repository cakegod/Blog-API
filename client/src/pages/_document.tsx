import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className='dark'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body className='h-full w-full bg-slate-100 dark:bg-gray-800 p-6'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}