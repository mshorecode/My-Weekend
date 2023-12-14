import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../utils/context/authContext';
import { getHousehold } from '../api/householdData';

function Home() {
  const [household, setHousehold] = useState([]);
  const { user } = useAuth();

  const renderHousehold = () => {
    getHousehold(user.uid).then(setHousehold);
  };

  useEffect(() => {
    renderHousehold();
  });

  if (household.length > 0) {
    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome Back {user.displayName}!</h1>
      </div>
    );
  }
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
      }}
    >
      <h2>Click the button below to create a family!</h2>
      <Button variant="contained" className="p-1 w-40 mx-auto my-3" href="/household/new">
        Create Family
      </Button>
    </div>
  );
}

export default Home;
