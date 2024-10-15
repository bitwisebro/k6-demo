import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    //Sending a GET request
    http.get('https://test.k6.io');
    //Suspend script for 10
    sleep(10);
  }
