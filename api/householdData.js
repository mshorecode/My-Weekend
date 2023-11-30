import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getHousehold = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/household.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
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
  getHousehold,
  createHousehold,
  updateHousehold,
};
