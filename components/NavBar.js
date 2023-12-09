/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Nav, Button,
} from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import Logo from '../styles/logo.png';

export default function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="sticky-top" style={{ background: '#05014a' }}>
        <Navbar.Brand style={{ color: '#fff', fontWeight: '600' }}>
          <div style={{ width: '80px', height: 'auto' }}>
            <Image
              src={Logo}
              style={{ objectFit: 'contain' }}
              alt="logo"
            />
          </div>
        </Navbar.Brand>
        <Nav className="me-auto">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/dashboard">
            <Nav.Link style={{ color: '#fff', fontWeight: '600' }}>Dashboard</Nav.Link>
          </Link>
          <Link passHref href="/schedule">
            <Nav.Link style={{ color: '#fff', fontWeight: '600' }}>Schedule</Nav.Link>
          </Link>
          <Link passHref href="/payments">
            <Nav.Link style={{ color: '#fff', fontWeight: '600' }}>Payments</Nav.Link>
          </Link>
        </Nav>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Navbar>
    </>
  );
}
