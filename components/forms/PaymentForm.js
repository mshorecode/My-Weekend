import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPayment, updatePayment } from '../../api/paymentData';

const initialState = {
  title: '',
  amount: '',
  payReason: '',
  imageUrl: '',
};

export default function PaymentForm({ paymentObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (paymentObj.firebaseKey) setFormInput(paymentObj);
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
      const payload = { ...formInput, uid: user.uid };
      createPayment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePayment(patchPayload).then(() => {
          router.push('/payments');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-black mt-5">{paymentObj.firebaseKey ? 'Update' : 'Add'} Payment</h1>

      {/* TITLE INPUT */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Title"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter schedule change title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* AMOUNT */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Amount"
        className="mb-3"
      >
        <Form.Control
          type="number"
          placeholder="Enter Total Amount"
          name="amount"
          value={formInput.amount}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CHANGE REASON */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Pay Reason"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter pay reason"
          name="payReason"
          value={formInput.payReason}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Receipts & Bills"
        className="mb-3"
      >
        <Form.Control
          type="url"
          placeholder="Upload Receipt or Bill"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{paymentObj.firebaseKey ? 'Update' : 'Add'} Payment</Button>
    </Form>

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
