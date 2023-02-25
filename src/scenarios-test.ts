import http from 'k6/http';
import {check, sleep} from 'k6';
import {Options} from "k6/options";

export const options:Options = {
    //메모리에 응답을 올리지 않음
    discardResponseBodies: true,
    stages: [
        { duration: '3m', target: 1000 },
        { duration: '4m', target: 10000 },
        { duration: '2m', target: 400 },
    ],
    // scenarios: {
    //     contacts: {
    //         executor: 'shared-iterations',
    //         vus: 1000,
    //         iterations: 10000,
    //         maxDuration: '5m',
    //     },
    // },
};

export default function () {

    const res = http.get('http://127.0.0.1:500');

    check(res, {
        'status is 500': (r) => r.status == 200,
    });

    sleep(0.5);
}