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

  function originalConvertedStart() {
    return (
      moment(scheduleObj.originalStartDate).format('MMM Do YYYY')
    );
  }

  function originalConvertedEnd() {
    return (
      moment(scheduleObj.originalEndDate).format('MMM Do YYYY')
    );
  }

  function proposedConvertedStart() {
    return (
      moment(scheduleObj.proposedStartDate).format('MMM Do YYYY')
    );
  }

  function proposedConvertedEnd() {
    return (
      moment(scheduleObj.proposedEndDate).format('MMM Do YYYY')
    );
  }

  const originalStart = originalConvertedStart();
  const originalEnd = originalConvertedEnd();
  const proposedStart = proposedConvertedStart();
  const proposedEnd = proposedConvertedEnd();

  return (
    <Card className="w-full h-72 shadows flex flex-col">
      <Typography
        className="bg-[#e39077]"
        sx={{
          fontSize: '24px', fontWeight: '500', textShadow: '1px 1px 4px black', color: 'white', padding: '8px 8px 8px 15px',
        }}
        color="text.secondary"
      >{scheduleObj.title}
      </Typography>
      <CardContent>
        <div className="grid-container gap-[14px]">
          <div className="flex flex-col grid-item item1">
            <Typography className="text-xs" color="text.secondary">Original Dates:</Typography>
            <Typography className="date-text fw-medium" color="text.primary">{originalStart} - {originalEnd}</Typography>
          </div>
          <div className="flex flex-col grid-item item2">
            <Typography className="text-xs" color="text.secondary">Proposed Dates:</Typography>
            <Typography className="fw-medium date-text" variant="subtitle1" color="text.primary">{proposedStart} - {proposedEnd}</Typography>
          </div>
          <div className="flex flex-col grid-item item3">
            <Typography className="text-xs" color="text.secondary">Reason:</Typography>
            <Typography className="fs-6 fw-medium overflow-scroll">{scheduleObj.changeReason}</Typography>
          </div>
        </div>
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
    originalStartDate: PropTypes.string,
    originalEndDate: PropTypes.string,
    proposedStartDate: PropTypes.string,
    proposedEndDate: PropTypes.string,
    changeReason: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
