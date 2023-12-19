import { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getScheduleChange } from '../api/scheduleData';
import ScheduleOverviewCard from '../components/ScheduleOverviewCard';
import { getPayment } from '../api/paymentData';
import PaymentOverviewCard from '../components/PaymentOverviewCard';
import { getHousehold } from '../api/householdData';

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const [payments, setPayments] = useState([]);
  const [household, setHousehold] = useState([]);
  const { user } = useAuth();

  const renderSchedules = () => {
    getScheduleChange(user.uid).then(setSchedules);
  };

  const renderPayments = () => {
    getPayment(user.uid).then(setPayments);
  };

  const renderHousehold = () => {
    getHousehold(user.uid).then(setHousehold);
  };

  useEffect(() => {
    renderHousehold();
    renderSchedules();
    renderPayments();
  }, []);

  if (household.length === 0) {
    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4" sx={{ mt: '40px', textAlign: 'center' }}>
        The {household[0].familyName} Family
      </Typography>
      <div className="flex flex-col vh-100">
        <Card className="m-4 shadows">
          <div className="w-full h-full vh-100">
            <Grid container>
              <Grid item xs={12} className="mx-4 flex flex-row" />
              <Typography variant="h4" className="mx-4 my-4">
                Schedule Overview
              </Typography>
              <Grid item className="grid grid-cols-2 gap-5 m-4 w-full">
                {schedules.toReversed().slice(0, 4).map((schedule) => (
                  <ScheduleOverviewCard key={schedule.firebaseKey} scheduleObj={schedule} />
                ))}
              </Grid>
            </Grid>
          </div>
        </Card>
        <Card className="m-4 shadows">
          <div className="w-full h-full vh-100">
            <Grid container>
              <Grid item xs={12} className="mx-4 flex flex-row" />
              <Typography variant="h4" className="mx-4 my-4">
                Payments Overview
              </Typography>
              <Grid item className="grid grid-cols-4 gap-5 m-4 w-full">
                {payments.toReversed().slice(0, 4).map((payment) => (
                  <PaymentOverviewCard key={payment.firebaseKey} paymentObj={payment} />
                ))}
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </>
  );
}
