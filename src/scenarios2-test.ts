import http from 'k6/http';
import {check} from "k6";

export const options = {
    discardResponseBodies: true,

    scenarios: {
        contacts: {
            executor: 'ramping-arrival-rate',

            //  timeUnit(예 분)당 300번의 반복 속도로 테스트를 시작했다.
            startRate: 300,

            //  분당 'startRate' 반복을 시작해야 한다.
            timeUnit: '1m',

            // 테스트를 시작하기 전에 2개의 VU를 미리 할당해야한다.
            preAllocatedVUs: 2,

            // 정의된 일정한 도달률을 유지하기 위해 최대 50개의 VU를 회전할 수 있다.
            maxVUs: 50,

            stages: [
                // 처음 1분 동안 'timeUnit' 당 300번의 반복을 시작해야한다.
                { target: 300, duration: '1m' },

                // 다음 2분 동안 'timeUnit' 당 600회의 반복을 시작 하도록 선형으로 증가해야한다.
                { target: 600, duration: '2m' },

                // 다음 4분 동안 'timeUnit' 당 600번의 반복을 계속 시작해야한다.
                { target: 600, duration: '4m' },

                // 지난 기분 동안 'timeUnit' 당 60회 반복을 시작하도록 선형으로 감소해야 한다.
                { target: 60, duration: '2m' },
            ],
        },
    },
};

export default function () {
    const res = http.get('http://127.0.0.1:500');

    check(res, {
        'status is 500': (r) => r.status == 200,
    });

}