import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import Logo from '../styles/logo_title.png';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center flex flex-column justify-center content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <Image src={Logo} alt="logo" />
      <Button type="button" size="small" variant="contained" className="bg-button-bg w-64 mx-auto" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
