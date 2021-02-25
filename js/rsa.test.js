import fs from 'fs';
import fc from 'fast-check';
import {
  isPrime,
  generateKeys,
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

it('decryption key should be multiplicative inverse of encryption key', () => {
  fc.assert(fc.property(
    fc.nat(2**14).filter((n) => isPrime(n)),
    fc.nat(2**14).filter((n) => isPrime(n)),
    (p, q) => {
      fc.pre(p !== q);
      const e = calculateEncryptionKey(p, q);
      const d = calculateDecryptionKey(e, p, q);
      const totientOfN = (p - 1) * (q - 1);
      expect(((d * e) - 1) % totientOfN === 0).toBe(true);
    },
  ));
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
