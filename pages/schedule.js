import { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import Link from 'next/link';
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

      <div className="w-full h-full vh-100">
        <Card className="m-4 shadows">
          <div className="w-full h-full vh-100">
            <Grid container>
              <Grid item xs={12} className="mx-4 flex flex-row">
                <Typography variant="h4" sx={{ mt: '40px' }}>Schedule Changes</Typography>
                <div className="mt-12 mr-4 fw-semibold text-[#E2653F] last:ml-auto">
                  <Link href="/schedule/new">
                    New Request
                  </Link>
                </div>
              </Grid>
              <Grid item className="grid grid-cols-1 gap-5 m-4 w-full">
                {schedules.map((schedule) => (
                  <ScheduleCard key={schedule.firebaseKey} scheduleObj={schedule} onUpdate={renderSchedules} />
                ))}
              </Grid>
            </Grid>
          </div>
        </Card>
      </div>
    </>
  );
}
