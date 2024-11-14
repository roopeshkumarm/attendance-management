import React from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

function layout({ children }) {
  return (
    <div className="flex">
      
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>

      
      <div className="flex-1 ml-0 md:ml-64">
        <Header />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default layout;
