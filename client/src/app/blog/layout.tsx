'use client';

import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute='class' enableSystem={true}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
