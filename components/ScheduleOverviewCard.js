import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export default function ScheduleOverviewCard({ scheduleObj }) {
  return (
    <Card id="schedule-overview">
      <h3 className="text-center m-3" style={{ fontWeight: '600' }}>Schedule Changes</h3>
      <div className="card" style={{ width: '22rem', margin: '10px auto' }}>
        <div className="card-body">
          <h5 className="card-title">{scheduleObj.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{scheduleObj.startDate} to {scheduleObj.endDate}</h6>
          <p className="card-text">{scheduleObj.changeReason}</p>
        </div>
      </div>
      <Button style={{ width: '12rem', margin: '0 auto' }}>New Request</Button>
    </Card>
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
