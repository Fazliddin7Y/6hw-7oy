import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-10">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
