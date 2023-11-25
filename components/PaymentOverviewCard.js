import React from 'react';
import PropTypes from 'prop-types';

export default function PaymentOverviewCard({ paymentObj }) {
  return (
    <div className="card" style={{ width: '22rem', margin: '10px auto' }}>
      <div className="card-body">
        <h5 className="card-title">{paymentObj.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">${paymentObj.amount}</h6>
        <p className="card-text">{paymentObj.payReason}</p>
      </div>
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
  }).isRequired,
};
