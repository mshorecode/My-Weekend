import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';
import { getHousehold } from '../api/householdData';
import Talking from '../styles/communicate.png';
import HouseholdForm from '../components/forms/HouseholdForm';

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
    <>
      <div className="flex flex-row vh-100">
        <div className="bg-[#fff] w-full">
          <div className="w-[60%] h-[60%] mx-auto mt-[450px]">
            <Image alt="communication" src={Talking} className=" rounded-2xl" />
          </div>
        </div>
        <div className="text-center w-full">
          <HouseholdForm />
        </div>
      </div>
    </>
  );
}

export default Home;
