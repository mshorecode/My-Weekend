import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import Logo from '../styles/logo_title.png';
import { signIn } from '../utils/auth';

export default function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div>
        <Image
          src={Logo}
          style={{ objectFit: 'contain' }}
          alt="logo"
        />
      </div>
      <Button variant="contained" onClick={signIn} className="mx-auto w-72 h-auto">
        Sign In
      </Button>
    </div>
  );
}
