/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>My Weekend</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/">
            <Nav.Link>Dashboard</Nav.Link>
          </Link>
          <Link passHref href="/">
            <Nav.Link>Schedule</Nav.Link>
          </Link>
          <Link passHref href="/">
            <Nav.Link>Payments</Nav.Link>
          </Link>
        </Nav>
        <Button variant="danger" onClick={signOut}>Sign Out</Button>
      </Container>
    </Navbar>
  );
}
