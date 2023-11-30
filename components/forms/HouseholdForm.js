import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createHousehold, updateHousehold } from '../../api/householdData';

const initialState = {
  familyName: '',
};

export default function HouseholdForm({ householdObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (householdObj.firebaseKey) setFormInput(householdObj);
  }, [householdObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };
    createHousehold(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateHousehold(patchPayload).then(() => {
        router.push('/dashboard');
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-black mt-5">Create Household</h1>

      {/* FAMILY NAME */}
      <FloatingLabel
        controlId="floatingInput1"
        label="Household Last Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter household last name"
          name="familyName"
          value={formInput.familyName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">Create Household</Button>
    </Form>
  );
}

HouseholdForm.propTypes = {
  householdObj: PropTypes.shape({
    familyName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

HouseholdForm.defaultProps = {
  householdObj: initialState,
};
