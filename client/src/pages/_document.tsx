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
      <body className='min-h-screen w-full overflow-y-scroll bg-slate-100 dark:bg-zinc-900 pt-14 pb-6 px-6 flex justify-center'>
        <div className='max-w-4xl w-full'>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
