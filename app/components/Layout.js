// components/Layout.js
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Footer from './Footer';
import Navbar from './Navbar';
// import Header from './Header'; // If you have a header component

const Layout = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <main style={{ paddingTop: theme.mixins.toolbar.minHeight * 3 + 'px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
