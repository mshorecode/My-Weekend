import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHouse } from 'react-icons/fa6';
import { FaMoneyCheckAlt, FaRegCalendarAlt } from 'react-icons/fa';
import Logo from '../styles/logo.png';
import SideBarIcon from './SideBarIcon';
import SideBarMenu from './SideBarMenu';
import Divider from './Divider';

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-gray-700 text-white shadow-lg">
      <div className="w-16 h-auto mt-2 mx-auto">
        <Image src={Logo} alt="logo" />
      </div>
      <Divider />
      <SideBarIcon
        icon={(
          <Link href="/dashboard" passHref>
            <FaHouse size="30" />
          </Link>
        )}
      />
      <SideBarIcon
        icon={(
          <Link href="/schedule" passHref>
            <FaRegCalendarAlt size="30" />
          </Link>
        )}
      />
      <SideBarIcon
        icon={(
          <Link href="/payments" passHref>
            <FaMoneyCheckAlt size="30" />
          </Link>
        )}
      />
      <SideBarMenu />
    </div>
  );
}
