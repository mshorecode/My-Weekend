import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

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

export default createHousehold;
