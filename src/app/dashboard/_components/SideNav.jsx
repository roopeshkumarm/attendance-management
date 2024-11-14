"use client"
import React from 'react';
import Image from 'next/image';
import { GraduationCapIcon, Hand, LayoutIcon, Settings } from 'lucide-react';
import Link from 'next/link';


function SideNav() {
  
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <LayoutIcon />,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Students',
      icon: <GraduationCapIcon />,
      path: '/dashboard/student',
    },
    {
      id: 3,
      name: 'Attendance',
      icon: <Hand />,
      path: '/dashboard/attendance',
    },
    {
      id: 4,
      name: 'Settings',
      icon: <Settings />,
      path: '/dashboard/settings',
    },
  ];

  return (
    <div className="border shadow-md h-screen p-10 ">

      <div className='flex justify-center mb-15'>
      <Image 
          src="/logo_cit.png" 
          alt="Logo or description" 
          width={100} 
          height={100} />
      </div>

      <hr className="my-5" />
      {menuList.map((menu) => (
        <Link
          href={menu.path}
          key={menu.id} 
          className="flex items-center gap-3 text-md p-4 text-slate-700 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-3"
        >
          {menu.icon}
          {menu.name}
        </Link>
      ))}

{/* 
      <div className="flex items-center gap-3 bottom-5 p-2 fixed">
 
      </div>       */}
    </div>
  );
}

export default SideNav;
