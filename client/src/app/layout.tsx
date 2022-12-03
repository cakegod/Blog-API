'use client';

import Header from '@blog/Header';
import Footer from '@blog/Footer';
import '@/styles/global.css';
import { Poppins } from '@next/font/google';
import { ThemeProvider } from 'next-themes';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={poppins.className}>
      <head>
        <title>Cake&apos;s blog</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        ></meta>
        <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
      </head>
      <body className='flex min-h-screen w-full justify-center overflow-y-scroll bg-slate-50 p-6 pt-14 dark:bg-[#161b22]'>
        <div className='w-full max-w-4xl'>
          <div className='flex min-h-screen flex-col'>
            <ThemeProvider attribute='class' enableSystem={true}>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
