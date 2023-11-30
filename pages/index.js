import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
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
      <Button
        type="button"
        size="sm"
        className="copy-btn"
        style={{ fontWeight: '600', width: '50%', margin: '10px auto' }}
        href="/household/new"
      >
        Create Family
      </Button>
    </div>
  );
}

export default Home;
