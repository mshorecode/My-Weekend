/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { GoTrash, GoPencil } from 'react-icons/go';
import { deletePayment } from '../api/paymentData';

export default function PaymentCard({ paymentObj, onUpdate }) {
  const deletePaymentLog = () => {
    if (window.confirm(`Delete ${paymentObj.title}?`)) {
      deletePayment(paymentObj.firebaseKey).then(() => onUpdate());
    }
  };

  const adjustedPayment = paymentObj.amount / 2;

  return (
    <Card style={{
      width: '18rem', height: '18rem', border: '1px solid gray', boxShadow: '4px 4px 2px gray',
    }}
    >
      <Card.Body>
        <Card.Title>{paymentObj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${adjustedPayment}</Card.Subtitle>
        <Card.Text>
          {paymentObj.payReason}
        </Card.Text>
        <Card.Link href={`/payments/edit/${paymentObj.firebaseKey}`}>
          <GoPencil style={{ color: 'green' }} /> Update
        </Card.Link>
        <Card.Link onClick={deletePaymentLog}>
          <GoTrash style={{ color: 'red' }} />
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

PaymentCard.propTypes = {
  paymentObj: PropTypes.shape({
    title: PropTypes.string,
    amount: PropTypes.string,
    payReason: PropTypes.string,
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
