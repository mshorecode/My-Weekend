import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getScheduleChange = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/schedule.json?orderBy="uid"&equalTo="${uid}"`, {
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

const createScheduleChange = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/schedule.json`, {
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

const updateScheduleChange = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/schedule/${payload.firebaseKey}.json`, {
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

const deleteScheduleChange = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/schedule/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getScheduleChange,
  createScheduleChange,
  updateScheduleChange,
  deleteScheduleChange,
};
