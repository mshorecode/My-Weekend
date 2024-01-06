/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { GoTrash, GoPencil } from 'react-icons/go';
import {
  Card, CardActions, CardContent, Typography,
} from '@mui/material';
import Link from 'next/link';
import { deletePayment } from '../api/paymentData';

export default function PaymentCard({ paymentObj, onUpdate }) {
  const deletePaymentLog = () => {
    if (window.confirm(`Delete ${paymentObj.title}?`)) {
      deletePayment(paymentObj.firebaseKey).then(() => onUpdate());
    }
  };

  function convertedDate() {
    return (
      new Date(paymentObj.dateCreated).toDateString()
    );
  }

  const adjustedPayment = Number(paymentObj.amount / 2).toFixed(2);

  return (
    <Card className="w-full h-60 shadows flex flex-col">
      <div className="flex flex-row justify-between bg-[#37D0DE]">
        <Typography
          sx={{
            fontSize: '16px', fontWeight: '500', textShadow: '1px 1px 4px black', color: 'white', padding: '8px 8px 8px 16px',
          }}
          color="text.secondary"
        >{paymentObj.title}
        </Typography>
      </div>
      <CardContent>
        <div className="grid-container gap-[14px]">
          <div className="flex flex-col grid-item item1">
            <Typography className="text-xs" color="text.secondary">Amount Owed:</Typography>
            <Typography className="date-text fw-medium" color="text.primary">${adjustedPayment}</Typography>
          </div>
          <div className="flex flex-col grid-item item2">
            <Typography className="text-xs" color="text.secondary">Payment Date:</Typography>
            <Typography className="fw-medium date-text" variant="subtitle1" color="text.primary">{convertedDate()}</Typography>
          </div>
          <div className="flex flex-col grid-item item3">
            <Typography className="text-xs" color="text.secondary">Reason:</Typography>
            <Typography className="fs-6 fw-medium overflow-scroll">{paymentObj.payReason}</Typography>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-end last:mt-auto">
        <CardActions>
          <Link href={`/payments/edit/${paymentObj.firebaseKey}`} passHref>
            <GoPencil className="text-green-600" />
          </Link>
          <div className="m-2">
            <GoTrash className="text-red-600" onClick={deletePaymentLog} />
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

PaymentCard.propTypes = {
  paymentObj: PropTypes.shape({
    title: PropTypes.string,
    amount: PropTypes.string,
    payReason: PropTypes.string,
    firebaseKey: PropTypes.string,
    dateCreated: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
