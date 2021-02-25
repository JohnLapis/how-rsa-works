import fs from 'fs';
import {
  isPrime,
  coprime,
  generatePrime,
  randint,
  calculateEncryptionKey,
  calculateDecryptionKey,
  encrypt,
  decrypt,
} from './rsa';

it('isPrime', () => {
  fs.readFileSync('./first_999_primes.txt', { encoding: 'utf-8' })
    .split('\n').slice(0, 5).forEach((prime) => {
      expect(isPrime(Number(prime))).toBe(true);
    });
});

it.each([

])('calculateEncryptionKey', (p, q, expected) => {
  const e = calculateEncryptionKey(p, q);
  expect(e).toEqual(expected);
});

it.each([

])('calculateDecryptionKey', (e, p, q, expected) => {
  const d = calculateDecryptionKey(e, p, q);
  expect(d).toEqual(expected);
});

it.each([

])('encrypt', (plaintext, key, ciphertext) => {
  const encryptedPlaintext = encrypt(plaintext, key);
  expect(encryptedPlaintext).toEqual(ciphertext);
});

it.each([

])('decrypt', (ciphertext, key, plaintext) => {
  const decryptedCiphertext = decrypt(ciphertext, key);
  expect(decryptedCiphertext).toEqual(plaintext);
});
