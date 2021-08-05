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

    return cryptojs.SHA256(checksum.toString()).toString();
}

export function validateChecksum(data, secret, expectedChecksum) {
    const checksum = createChecksum(data, secret);

    return checksum == expectedChecksum;
}

