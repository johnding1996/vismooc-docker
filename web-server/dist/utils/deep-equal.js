"use strict";
function deepEqual(actual, expected) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
        return true;
    }
    else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
    }
    else if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
        return actual === expected;
    }
    else {
        return objEquiv(actual, expected);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deepEqual;
function isUndefinedOrNull(value) {
    return value === null || value === undefined;
}
function objEquiv(a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) {
        return false;
    }
    // an identical 'prototype' property.
    if (a.prototype !== b.prototype) {
        return false;
    }
    if (Buffer.isBuffer(a)) {
        if (!Buffer.isBuffer(b)) {
            return false;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0, len = a.length; i < len; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    let ka;
    let kb;
    try {
        ka = Object.keys(a);
        kb = Object.keys(b);
    }
    catch (e) {
        // happens when one is a string literal and the other isn't
        return false;
    }
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length !== kb.length) {
        return false;
    }
    // the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    // ~~~cheap key test
    for (let i = ka.length - 1; i >= 0; i--) {
        if (ka[i] !== kb[i]) {
            return false;
        }
    }
    // equivalent values for every corresponding key, and
    // ~~~possibly expensive deep test
    for (let i = ka.length - 1, key; i >= 0; i--) {
        key = ka[i];
        if (!deepEqual(a[key], b[key])) {
            return false;
        }
    }
    return typeof a === typeof b;
}

//# sourceMappingURL=deep-equal.js.map
