import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getScheduleChange } from '../api/scheduleData';
import ScheduleOverviewCard from '../components/ScheduleOverviewCard';
import { getPayment } from '../api/paymentData';
import PaymentOverviewCard from '../components/PaymentOverviewCard';

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();

  const renderSchedules = () => {
    getScheduleChange(user.uid).then(setSchedules);
  };

  const renderPayments = () => {
    getPayment(user.uid).then(setPayments);
  };

  useEffect(() => {
    renderSchedules();
    renderPayments();
  }, []);

  return (
    <div className="my-4">
      <h1 id="header">The Shore Family</h1>
      <div className="d-flex flex-wrap" id="overview-container">
        <Card id="schedule-overview">
          <h3 className="text-center m-3" style={{ fontWeight: '600' }}>
            Schedule Changes
          </h3>
          <div>
            {schedules.slice(0, 3).map((schedule) => (
              <ScheduleOverviewCard key={schedule.firebaseKey} scheduleObj={schedule} />
            ))}
          </div>
          <Button style={{ width: '12rem', margin: '0 auto' }}>
            New Request
          </Button>
        </Card>
        <Card id="payment-overview">
          <h3 className="text-center m-3" style={{ fontWeight: '600' }}>
            Payment Requests
          </h3>
          <div>
            {payments.slice(0, 3).map((payment) => (
              <PaymentOverviewCard key={payment.firebaseKey} paymentObj={payment} />
            ))}
          </div>
          <Button style={{ width: '12rem', margin: '0 auto' }}>
            New Request
          </Button>
        </Card>
      </div>
    </div>
  );
}
