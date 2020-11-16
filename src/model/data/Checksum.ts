import cryptojs from 'crypto-js';

export function createChecksum(data, secret) {
    const dataAsString = data ? JSON.stringify(data) : "";
    let checksum = 0;

    for (let i = 0; i < dataAsString.length; i++) {
        checksum += dataAsString.charCodeAt(i) * i;
    }

    for (let i = 0; i < secret.length; i++) {
        checksum += secret.charCodeAt(i) * i;
    }

    return cryptojs.SHA256(checksum).toString();
}

function hashValue(input) {
    let hash = 0, i, chr;

    input = input.toString();

    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function validateChecksum(data, secret, expectedChecksum) {
    const checksum = createChecksum(data, secret);

    return checksum == expectedChecksum;
}

