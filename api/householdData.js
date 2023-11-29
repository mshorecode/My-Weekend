import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleHousehold = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/household/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createHousehold = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/household.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateHousehold = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/household/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSingleHousehold,
  createHousehold,
  updateHousehold,
};
