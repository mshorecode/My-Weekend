import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Grid, TextField, Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createPayment, updatePayment } from '../../api/paymentData';
import { getHousehold } from '../../api/householdData';

const initialState = {
  title: '',
  amount: '',
  payReason: '',
  imageUrl: '',
};

export default function PaymentForm({ paymentObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [household, setHousehold] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getMyHousehold = () => {
    getHousehold(user.uid).then(setHousehold);
  };

  useEffect(() => {
    if (paymentObj.firebaseKey) setFormInput(paymentObj);
    getMyHousehold();
  }, [paymentObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentObj.firebaseKey) {
      updatePayment(formInput).then(() => router.push('/payments'));
    } else {
      const payload = {
        ...formInput, uid: user.uid, householdId: household[0].firebaseKey, dateCreated: new Date(),
      };
      createPayment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePayment(patchPayload).then(() => {
          router.push('/payments');
        });
      });
    }
  };

  return (
    <div className="flex justify-center mt-[450px]">
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <div className="flex flex-row gap-10 justify-center">
              <Typography variant="h6" className="text-black mt-5">{paymentObj.firebaseKey ? 'Update' : 'Add'} Payment
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="flex flex-row gap-10 justify-center">
              <div>
                {/* TITLE INPUT */}
                <TextField
                  type="text"
                  id="standard-basic"
                  label="Payment Title"
                  variant="standard"
                  name="title"
                  className="w-[200px]"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                {/* AMOUNT */}
                <TextField
                  type="number"
                  label="Amount"
                  variant="standard"
                  className="w-[100px]"
                  name="amount"
                  value={formInput.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

          </Grid>

          <Grid item xs={12}>
            <div className="flex flex-row gap-10 justify-center">
              {/* CHANGE REASON */}
              <TextField
                type="text"
                label="Reason"
                variant="standard"
                className="w-[340px]"
                name="payReason"
                value={formInput.payReason}
                onChange={handleChange}
                required
              />
            </div>
          </Grid>

          <Grid item xs={12}>

            {/* IMAGE */}
            <div className="flex flex-row gap-10 justify-center">
              <TextField
                type="url"
                label="Upload Receipt or Bill"
                variant="standard"
                className="w-[340px]"
                name="imageUrl"
                value={formInput.imageUrl}
                onChange={handleChange}
              />
            </div>

          </Grid>

          <Grid item xs={12}>
            {/* SUBMIT BUTTON  */}
            <div className="flex flex-row gap-10 justify-center">
              <Button type="submit" className="">{paymentObj.firebaseKey ? 'Update' : 'Add'} Payment</Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>

  );
}

PaymentForm.propTypes = {
  paymentObj: PropTypes.shape({
    title: PropTypes.string,
    amount: PropTypes.string,
    payReason: PropTypes.string,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PaymentForm.defaultProps = {
  paymentObj: initialState,
};
