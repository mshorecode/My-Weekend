/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { GoTrash, GoPencil } from 'react-icons/go';
import {
  Card, CardActions, CardContent, Typography,
} from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { deleteScheduleChange } from '../api/scheduleData';

export default function ScheduleCard({ scheduleObj, onUpdate }) {
  const deleteScheduleEvent = () => {
    if (window.confirm(`Delete ${scheduleObj.title}?`)) {
      deleteScheduleChange(scheduleObj.firebaseKey).then(() => onUpdate());
    }
  };

  function convertedStart() {
    return (
      moment(scheduleObj.startDate).format('MMM Do YYYY')
    );
  }

  function convertedEnd() {
    return (
      moment(scheduleObj.endDate).format('MMM Do YYYY')
    );
  }

  return (
    <Card className="w-full h-60 shadows flex flex-col">
      <Typography
        className="bg-[#e39077]"
        sx={{
          fontSize: '24px', fontWeight: '500', textShadow: '1px 1px 4px black', color: 'white', padding: '8px 8px 8px 15px',
        }}
        color="text.secondary"
      >{scheduleObj.title}
      </Typography>
      <CardContent>
        <div className="flex flex-row gap-[88px]">
          <Typography className="text-xs" color="text.secondary">Original Date:</Typography>
          <Typography className="text-xs" color="text.secondary">Date Proposed:</Typography>
        </div>
        <div className="flex flex-row gap-12">
          <Typography variant="h6">{convertedStart()}</Typography>
          <Typography variant="h6">{convertedEnd()}</Typography>
        </div>
        <Typography className="text-xs mt-1" color="text.secondary">Reason:</Typography>
        <Typography>
          {scheduleObj.changeReason}
        </Typography>
      </CardContent>
      <div className="flex justify-end last:mt-auto">
        <CardActions>
          <Link href={`/schedule/edit/${scheduleObj.firebaseKey}`} passHref>
            <GoPencil className="text-green-600 mx-2" />
          </Link>
          <div className="m-2">
            <GoTrash className="text-red-600" onClick={deleteScheduleEvent} />
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

ScheduleCard.propTypes = {
  scheduleObj: PropTypes.shape({
    householdId: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    changeReason: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
