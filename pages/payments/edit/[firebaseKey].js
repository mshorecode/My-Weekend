import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePayment } from '../../../api/paymentData';
import PaymentForm from '../../../components/forms/PaymentForm';

export default function EditPayments() {
  const [editPayment, setEditPayment] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePayment(firebaseKey).then(setEditPayment);
  }, [firebaseKey]);

  return (
    <PaymentForm paymentObj={editPayment} />
  );
}
