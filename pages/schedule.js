import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getScheduleChange } from '../api/scheduleData';
import ScheduleCard from '../components/ScheduleCard';

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const { user } = useAuth();

  const renderSchedules = () => {
    getScheduleChange(user.uid).then(setSchedules);
  };

  useEffect(() => {
    renderSchedules();
  }, []);

  return (
    <>
      <h1 className="text-center header">Schedule Changes</h1>
      <div className="d-flex flex-wrap card-container">
        {schedules.map((schedule) => (
          <ScheduleCard key={schedule.firebaseKey} scheduleObj={schedule} onUpdate={renderSchedules} />
        ))}
      </div>
    </>
  );
}
