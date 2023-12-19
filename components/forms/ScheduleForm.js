/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Box, Button, Grid, Input, TextField, Typography,
} from '@mui/material';
import { useAuth } from '../../utils/context/authContext';
import { createScheduleChange, updateScheduleChange } from '../../api/scheduleData';
import { getHousehold } from '../../api/householdData';

const initialState = {
  title: '',
  changeReason: '',
  startDate: '',
  endDate: '',
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
    <div className="flex justify-center mt-[450px]">
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <div className="flex flex-row gap-10 justify-center">
              <Typography variant="h6" className="text-black mt-5">{scheduleObj.firebaseKey ? 'Update' : 'Add'} Schedule Change
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="flex flex-row gap-10 justify-center">
              <div>
                {/* TITLE INPUT */}
                <TextField
                  type="text"
                  id="standard-basic"
                  label="Schedule Change Title"
                  variant="standard"
                  name="title"
                  className="w-[200px]"
                  value={formInput.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                {/* CHANGE REASON */}
                <TextField
                  type="text"
                  label="Reason"
                  variant="standard"
                  className="w-[340px]"
                  name="changeReason"
                  value={formInput.changeReason}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

          </Grid>

          <Grid item xs={12}>
            <div className="flex gap-10 w-[580px] mx-auto">
              {/* DATE PICKER */}
              <div>
                <Input
                  type="date"
                  name="startDate"
                  className="w-[270px]"
                  value={formInput.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  type="date"
                  name="endDate"
                  className="w-[270px]"
                  value={formInput.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

          </Grid>

          <Grid item xs={12}>
            {/* SUBMIT BUTTON  */}
            <div className="flex flex-row gap-10 justify-center">
              <Button type="submit">{scheduleObj.firebaseKey ? 'Update' : 'Add'} Schedule Change</Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>

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
