import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteScheduleChange } from '../api/scheduleData';

export default function ScheduleCard({ scheduleObj, onUpdate }) {
  const deleteScheduleEvent = () => {
    if (window.confirm(`Delete ${scheduleObj.title}?`)) {
      deleteScheduleChange(scheduleObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      width: '18rem', height: '18rem', border: '1px solid gray', boxShadow: '4px 4px 2px gray',
    }}
    >
      <Card.Body>
        <Card.Title>{scheduleObj.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{scheduleObj.startDate} to {scheduleObj.endDate}</Card.Subtitle>
        <Card.Text>
          {scheduleObj.changeReason}
        </Card.Text>
        <Card.Link href={`/schedule/edit/${scheduleObj.firebaseKey}`}>Update</Card.Link>
        <Card.Link onClick={deleteScheduleEvent}>Delete</Card.Link>
      </Card.Body>
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
