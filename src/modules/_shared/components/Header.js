import React from 'react';

import { Outlet } from 'react-router-dom';
import '../../../App.css';
import Footer from './Footer';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import SideBar from './SideBar';
import useScript from '../../_shared/hooks/UseScript';

const Header = () => {
  useScript('./js/main.js');

  return (
    <>
      <SideBar />
      <main className='main-wrapper'>
        <header className='header'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-5 col-md-5 col-6'>
                <HeaderLeft />
              </div>
              <div className='col-lg-7 col-md-7 col-6'>
                <HeaderRight />
              </div>
            </div>
          </div>
        </header>

        <section className='section'>
          <div className='container-fluid'>
            <Outlet />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Header;
