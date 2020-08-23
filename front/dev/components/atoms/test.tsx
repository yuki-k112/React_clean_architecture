import React from 'react';

const test = 'test';

function setValue<T, K extends keyof T, U extends T[K]>(obj: T, key: K, value: U) {
    obj[key] = value;
}

const park: ParkForm = {
    name: '恵比寿東',
    hasTako: true,
};

setValue(park, 'name', '神明児童遊園');
