'use client';

import { ThemeProvider } from 'next-themes';
import Header from '@blog/Header';
import Footer from '@blog/Footer';

interface Props {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: Props) {
  return (
    <ThemeProvider attribute='class' enableSystem={true}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
