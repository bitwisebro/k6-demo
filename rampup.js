//** In the first stage, during the 40s the amount of VUs is going to increase(max users 4)
//** In the second stage, during 1m20s, the amount of VUs is going to increase as well(max users 10)
//** In the last 20 seconds, during 20s, the amount of VUs is going to decrease(Min users 0)

export const options = {
    stages: [
      { duration: '40s', target: 4 },
      { duration: '1m20s', target: 10 },
      { duration: '20s', target: 0 },
    ],
  };
  export default function () {
    const res = http.get('https://httpbin.test.k6.io/');
    //This check is going to verify that every single request returns the status 200. If not, the report will tell you.
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(10);
  }