/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
// import Logo from '../styles/images/logo.png';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ background: '#05014a' }}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand style={{ color: '#fff', fontWeight: '600' }}>
            My Weekend
            {/* <img
              src={Logo}
              width="100"
              height="50"
              alt="Brand logo"
            /> */}
          </Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/dashboard">
            <Nav.Link style={{ color: '#fff', fontWeight: '600' }}>Dashboard</Nav.Link>
          </Link>
          <Link passHref href="/">
            <Nav.Link style={{ color: '#fff', fontWeight: '600' }}>Schedule</Nav.Link>
          </Link>
          <Link passHref href="/">
            <Nav.Link style={{ color: '#fff', fontWeight: '600' }}>Payments</Nav.Link>
          </Link>
        </Nav>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Container>
    </Navbar>
  );
}
