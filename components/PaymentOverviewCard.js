import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

export default function PaymentOverviewCard({ paymentObj }) {
  const adjustedPayment = paymentObj.amount / 2;
  function convertedDate() {
    return (
      new Date(paymentObj.dateCreated).toDateString()
    );
  }

  return (
    <div className="mt-2 mb-3">
      <Card className="w-full h-60 shadows flex flex-col">
        <div className="flex flex-row justify-between bg-[#37D0DE]">
          <Typography
            sx={{
              fontSize: '16px', fontWeight: '500', textShadow: '1px 1px 4px black', color: 'white', padding: '8px 8px 8px 16px',
            }}
            color="text.secondary"
          >{paymentObj.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px', fontWeight: '500', textShadow: '1px 1px 4px black', color: 'white', padding: '8px 16px 8px 8px',
            }}
            color="text.secondary"
          >{convertedDate()}
          </Typography>
        </div>
        <CardContent>
          <Typography className="text-xs" color="text.secondary">Amount Owed:</Typography>
          <Typography variant="h6" className="" component="div">${adjustedPayment}</Typography>
          <Typography className="text-xs mt-1" color="text.secondary">Reason:</Typography>
          <Typography>
            {paymentObj.payReason}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

PaymentOverviewCard.propTypes = {
  paymentObj: PropTypes.shape({
    householdId: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.string,
    payReason: PropTypes.string,
    imageUrl: PropTypes.string,
    dateCreated: PropTypes.string,
  }).isRequired,
};
