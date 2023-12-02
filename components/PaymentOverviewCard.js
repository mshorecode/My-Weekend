import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function PaymentOverviewCard({ paymentObj }) {
  const adjustedPayment = paymentObj.amount / 2;

  return (
    <div className="mt-2 mb-3">
      <Card style={{ width: '22rem', margin: '0 auto' }}>
        <Card.Body className="border-white">
          <Card.Title className="fw-semibold mb-3">{paymentObj.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted fw-bolder">${adjustedPayment}</Card.Subtitle>
        </Card.Body>
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
  }).isRequired,
};
