import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPayment } from '../api/paymentData';
import PaymentCard from '../components/PaymentCard';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();

  const renderPayments = () => {
    getPayment(user.uid).then(setPayments);
  };

  useEffect(() => {
    renderPayments();
  }, []);

  return (
    <>
      <h1 className="text-center header">Payments</h1>
      <div className="d-flex flex-wrap">
        {payments.map((payment) => (
          <PaymentCard key={payment.firebaseKey} paymentObj={payment} onUpdate={renderPayments} />
        ))}
      </div>
    </>
  );
}
