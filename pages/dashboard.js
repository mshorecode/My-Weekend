import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
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
    <div className="my-4">
      <h1 className="header">The {household[0].familyName} Family
      </h1>
      <div className="d-flex flex-wrap" id="overview-container">
        <Card id="schedule-overview">
          <h3 className="text-center m-3" style={{ fontWeight: '600' }}>
            Schedule Changes
          </h3>
          <Button style={{ width: '12rem', margin: '0 auto' }} href="/schedule/new">
            New Request
          </Button>
          <div>
            {schedules.slice(0, 4).map((schedule) => (
              <ScheduleOverviewCard key={schedule.firebaseKey} scheduleObj={schedule} />
            ))}
          </div>
        </Card>
        <Card id="payment-overview">
          <h3 className="text-center m-3" style={{ fontWeight: '600' }}>
            Payment Requests
          </h3>
          <Button style={{ width: '12rem', margin: '0 auto' }} href="/payments/new">
            New Request
          </Button>
          <div>
            {payments.slice(0, 4).map((payment) => (
              <PaymentOverviewCard key={payment.firebaseKey} paymentObj={payment} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
