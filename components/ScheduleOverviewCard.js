import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ScheduleOverviewCard({ scheduleObj }) {
  return (
    <Card style={{ margin: '40px' }}>
      <Card.Title>
        {scheduleObj.title}
      </Card.Title>
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
