import { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import Link from 'next/link';
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
      <div className="flex flex-col vh-100">
        <Card className="m-4 shadows">
          <div className="w-full h-full vh-100">
            <Grid container>
              <Grid item xs={12} className="mx-4 flex flex-row">
                <Typography variant="h4" sx={{ my: '40px', textAlign: 'center' }}>
                  Pending Payments
                </Typography>
                <div className="mt-12 mr-4 text-[#E2653F] last:ml-auto">
                  <Link style={{ width: '12rem', margin: '0 auto' }} href="/payments/new">
                    New Request
                  </Link>
                </div>
              </Grid>
              <Grid item className="grid grid-cols-2 gap-5 m-4 w-full">
                {payments.toReversed().map((payment) => (
                  <PaymentCard key={payment.firebaseKey} paymentObj={payment} onUpdate={renderPayments} />
                ))}
              </Grid>
            </Grid>
          </div>
        </Card>
        <Card className="m-4 shadows">
          <div className="w-full h-full vh-100">
            <Grid container>
              <Grid item xs={12} className="mx-4">
                <Typography variant="h4" sx={{ my: '40px' }}>
                  Closed Payments
                </Typography>
              </Grid>
              <Grid item className="flex flex-wrap gap-5 m-4 w-full">
                <></>
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </>
  );
}
