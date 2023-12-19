import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

export default function ScheduleOverviewCard({ scheduleObj }) {
  function convertedStart() {
    return (
      new Date(scheduleObj.startDate).toLocaleDateString()
    );
  }

  function convertedEnd() {
    return (
      new Date(scheduleObj.endDate).toLocaleDateString()
    );
  }

  return (
    <div className="mt-2 mb-3">
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
          <div className="flex flex-row gap-[60px]">
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
      </Card>
    </div>
  );
}

ScheduleOverviewCard.propTypes = {
  scheduleObj: PropTypes.shape({
    householdId: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    changeReason: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
