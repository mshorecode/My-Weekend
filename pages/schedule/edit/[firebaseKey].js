import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleSchedule } from '../../../api/scheduleData';
import ScheduleForm from '../../../components/forms/ScheduleForm';

export default function EditSchedule() {
  const [editSchedule, setEditSchedule] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSchedule(firebaseKey).then(setEditSchedule);
  }, [firebaseKey]);

  return (
    <ScheduleForm scheduleObj={editSchedule} />
  );
}
