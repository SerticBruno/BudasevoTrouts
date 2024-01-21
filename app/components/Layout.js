// components/Layout.js
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
// import Header from './Header'; // If you have a header component

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <Navbar></Navbar>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
