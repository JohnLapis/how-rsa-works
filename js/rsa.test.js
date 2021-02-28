import fs from 'fs';
import fc from 'fast-check';
import {
  pulverizer,
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

it('pulverizer', () => {
  fc.assert(fc.property(
    fc.bigInt(0n, 2n**26n),
    fc.bigInt(0n, 2n**26n),
    (a, b) => {
      const result = pulverizer(a,b);
      expect(result.gcd - a * result.x - b * result.y).toBe(0n);
    },
  ));
});

it('decryption key should be multiplicative inverse of encryption key', () => {
  fc.assert(fc.property(
    fc.integer(3, 2**26).filter((n) => isPrime(n)),
    fc.integer(3, 2**26).filter((n) => isPrime(n)),
    (p, q) => {
      fc.pre(p !== q);
      const totientOfN = (p - 1) * (q - 1);
      const e = calculateEncryptionKey(p, q);
      const d = calculateDecryptionKey(e, p, q);
      const k = -pulverizer(totientOfN, e).x;
      // 1 = d*e - k*tot(n) implies (d*e - 1) / k = tot(n)
      expect(Math.round((d * e - 1) / k)).toEqual(totientOfN);
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
