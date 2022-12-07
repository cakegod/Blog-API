'use client';
import { ThemeProvider } from 'next-themes';
import React, { PropsWithChildren } from 'react';
import Footer from './blog/Footer';
import Header from './blog/Header';

function ContextWrapper({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute='class' enableSystem={true}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}

export default ContextWrapper;
