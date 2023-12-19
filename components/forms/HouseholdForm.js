/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
import Image from 'next/image';
import Logo from '../../styles/logo.png';
import { useAuth } from '../../utils/context/authContext';
import { createHousehold, updateHousehold } from '../../api/householdData';

const initialState = {
  familyName: '',
};

export default function HouseholdForm({ householdObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (householdObj.firebaseKey) setFormInput(householdObj);
  }, [householdObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createHousehold(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateHousehold(patchPayload).then(() => {
        router.push('/dashboard');
      });
    });
  };

  return (
    <Box className="flex-grow-1">
      <Grid container spacing={1}>
        <Grid xs={12}>
          <div className="w-1/2 h-1/2 mx-auto mt-[200px]">
            <Image src={Logo} alt="logo" />
            <Typography variant="h2" className="fw-medium">My Weekend</Typography>
          </div>
        </Grid>
        <Grid xs={12}>
          <Typography variant="h5" className="px-20 py-5" paragraph>
            We are all about making communication super easy and way more effective. Ready to start communicating better? Just start below.
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              type="text"
              id="standard-basic"
              label="Household Name"
              variant="standard"
              name="familyName"
              value={formInput.familyName}
              onChange={handleChange}
              className="w-[300px]"
              required
            />

            {/* SUBMIT BUTTON  */}
            <Button variant="contained" size="small" className="m-3 bg-button-bg" type="submit">Get Started</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

HouseholdForm.propTypes = {
  householdObj: PropTypes.shape({
    familyName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

HouseholdForm.defaultProps = {
  householdObj: initialState,
};
