import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ScheduleOverviewCard({ scheduleObj }) {
  return (
    <div className="mt-2 mb-3">
      <Card style={{ width: '22rem', margin: '0 auto' }}>
        <Card.Body className="border-white">
          <Card.Title className="fw-semibold mb-3">{scheduleObj.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted fw-bolder">{scheduleObj.startDate} to {scheduleObj.endDate}</Card.Subtitle>
        </Card.Body>
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
