import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getScheduleChange } from '../api/scheduleData';
import ScheduleOverviewCard from '../components/ScheduleOverviewCard';

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const { user } = useAuth();

  const renderSchedules = () => {
    getScheduleChange(user.uid).then(setSchedules);
  };

  useEffect(() => {
    renderSchedules();
  }, []);

  return (
    <div className="text-text-center my-4">
      <h1 id="header">The Shore Family</h1>
      <div className="d-flex flex-wrap">
        {schedules.map((schedule) => (
          <ScheduleOverviewCard key={schedule.firebaseKey} scheduleObj={schedule} onUpdate={renderSchedules} />
        ))}
      </div>
    </div>
  );
}
