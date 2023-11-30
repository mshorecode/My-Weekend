import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createScheduleChange, updateScheduleChange } from '../../api/scheduleData';
import { getHousehold } from '../../api/householdData';

const initialState = {
  title: '',
  startDate: '',
  endDate: '',
  changeReason: '',
};

export default function ScheduleForm({ scheduleObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [household, setHousehold] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getMyHousehold = () => {
    getHousehold(user.uid).then(setHousehold);
  };

  useEffect(() => {
    if (scheduleObj.firebaseKey) setFormInput(scheduleObj);
    getMyHousehold();
  }, [scheduleObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scheduleObj.firebaseKey) {
      updateScheduleChange(formInput).then(() => router.push('/schedule'));
    } else {
      const payload = { ...formInput, uid: user.uid, householdId: household[0].firebaseKey };
      createScheduleChange(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateScheduleChange(patchPayload).then(() => {
          router.push('/schedule');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-black mt-5">{scheduleObj.firebaseKey ? 'Update' : 'Add'} Schedule</h1>

      {/* TITLE INPUT */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Title"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter schedule change title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* START DATE */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Start Date"
        className="mb-3"
      >
        <Form.Control
          type="date"
          placeholder="Enter change start date"
          name="startDate"
          value={formInput.startDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* END DATE */}
      <FloatingLabel
        controlId="floatingInput1"
        label="End Date"
        className="mb-3"
      >
        <Form.Control
          type="date"
          placeholder="Enter change start date"
          name="endDate"
          value={formInput.endDate}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* CHANGE REASON */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Change Reason"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter change reason"
          name="changeReason"
          value={formInput.changeReason}
          onChange={handleChange}
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{scheduleObj.firebaseKey ? 'Update' : 'Add'} Schedule</Button>
    </Form>

  );
}

ScheduleForm.propTypes = {
  scheduleObj: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    changeReason: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ScheduleForm.defaultProps = {
  scheduleObj: initialState,
};
