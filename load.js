import http from 'k6/http';
import { check, sleep} from 'k6';

export const options = {
    // Let's simulating a normal day
    // to resemble your normal and peak conditions more closely.
    // In that case you could configure the load test to stay at 60(will use 6 for the demo) users 
    // for most of the day, and ramp-up to 100 users during the peak hours of operation,
    // then ramp-down back to normal load
  
    stages: [
      { duration: '1m', target: 6 },
      { duration: '1m', target: 6}, 
      { duration: '1m', target: 10}, 
      { duration: '1m', target: 10}, 
      { duration: '1m', target: 6}, 
      { duration: '1m', target: 6}, 
      { duration: '1m', target: 0 }, 
    ],
  
    thresholds: {
      'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };
  
  const BASE_URL = 'https://test-api.k6.io';
  const USERNAME = 'bitwisebro';
  const PASSWORD = 'Test1234';
  
  export default () => {
    //hit login endpoint first
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
      username: USERNAME,
      password: PASSWORD,
    });

    check(loginRes, {
      'logged in successfully': (resp) => resp.json('access') !== '',
    });
  
    // Creating an object with the authentication headers to be send in the next GET request.
    const authHeaders = {
      headers: {
        Authorization: `Bearer ${loginRes.json('access')}`,
      },
    };
  
    //Endpoint: https://test-api.k6.io/my/crocodiles/
    const myObjects = http.get(`${BASE_URL}/my/crocodiles/`, authHeaders).json();
    //This check is going to validate that there is more than one crocodile return
    check(myObjects, { 'retrieved crocodiles': (obj) => obj.length > 0 });
  
    sleep(1);
  };