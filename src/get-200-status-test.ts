import {group, sleep} from 'k6';
import {Options} from 'k6/options';
import http from "k6/http";
import {Trend} from "k6/metrics";

export const TrendRTT = new Trend('RTT');
export let options: Options = {
    vus: 1000,
    duration: '10s',
    thresholds: {
        'group_duration{group:::individualRequests}': [{abortOnFail: true, threshold: 'avg < 400'}],
        'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100']
    }
};


export default () => {
    group('individualRequests', () => {
        const res = http.get('http://localhost:8081');
        TrendRTT.add(res.timings.duration);
    })



    // const res = http.get('http://test.k6.io');
    //
    // check(res, {
    //     'is status 200': (r) => r.status === 200,
    //     'body length chk': (r) => r.body?.length === 11278
    // })


    // check(res, {
    //   'status is 200': () => res.status === 200,
    // });
    sleep(1);
};

