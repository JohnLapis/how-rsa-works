window = {};
window.minPrimeSize = 2 ** 10;
window.maxPrimeSize = 2 ** 14; // MAX_SAFE_VALUE is 2 ** 53

function isInt(n) {
  return Math.floor(n) - n === 0;
}

// max and min inclusive
function randint(min, max) {
  if (min > max) throw Error('First argument must be at most second argument.');
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function factorOutBy(n, factor) {
  if (factor <= 1 || !isInt(factor)) throw Error('Factor must be a positive integer greater than 1.');
  if (n <= 1 || !isInt(n)) throw Error('n must be a positive integer greater than 1.');

  let rest;
  let exponent = 0;
  while (true) {
    n /= factor;
    if (isInt(n)) {
      exponent += 1;
      rest = n;
    } else {
      return { exponent, rest };
    }
  }
}

function chooseBase(n, witnesses) {
  // Since n is large and we don't know the distribution of witnesses, the most
  // efficient method is choosing randomly.
  let base;
  while (true) {
    base = randint(1, n - 1);
    if (!witnesses.includes(base)) return base;
  }
}

function isPrime(n) {
  /* This algorithm implements the Miler-Rabin primality test using 40 rounds.
   *
   * Time complexity is O(k * (log(n) ** 3)), where k is the number of rounds
   * and n is the input.
   *
   * accuracy = bound vezesassim maxKeySize
   * accuracy = 1 / 4 ** rounds vezesassim 1023 bits
   * accuracy = 4 ** (-40) vezesassim 1023 bits
   * accuracy = um numero
   */
  if (!isInt(n)) throw Error('n must be an integer.');

  if (n === 2) return true;
  if (n % 2 === 0) return false;
  if (n < 2) return false;

  const rounds = n <= 40 ? n - 1 : 40;

  // n = 2**s * d + 1
  // n = 2 ** expOfTwo * rest + 1
  const { exponent: expOfTwo, rest } = factorOutBy(n - 1, 2);

  const witnesses = [];

  for (let i = 0; i < rounds; i++) {
    const base = chooseBase(n, witnesses);
    let x = (base ** rest) % n;
    if (x === 1 || x === n - 1) {
      witnesses.push(base);
      continue;
    }

    let j;
    for (j = 0; j < expOfTwo - 1; j++) {
      x **= 2;
      if (x % n === n - 1) {
        witnesses.push(base);
        break;
      }
    }
    if (j === expOfTwo) return false;
  }

  return true;
}

function generatePrime({ min, max }) {
  let n;
  while (true) {
    n = randint(min, max);
    if (isPrime(n)) return n;
  }
}

function setBaseNumbers() {
  let p;
  let q;
  do {
    p = generatePrime({ min: window.minPrimeSize, max: window.maxPrimeSize });
    q = generatePrime({ min: window.minPrimeSize, max: window.maxPrimeSize });
  } while (p === q);
  document.querySelector('#p').value = p;
  document.querySelector('#q').value = q;
  document.querySelector('#n').value = p * q;
}

function pulverizer(a, b) {
  /* Calculates gcd of max and min and returns when remainder equals stop.
   *
   * Based on a*x + b*y = gcd(max, min), the return object is {x, y, gcd}.
   */
  let q;
  // a = a*x0 + b*y0         b = a*x1 + b*y1
  let [x0, y0, x1, y1] = [1, 0, 0, 1];
  while (b !== 0) {
    [q, b, a] = [Math.floor(a / b), a % b, b];
    [x0, x1] = [x1, x0 - q * x1];
    [y0, y1] = [y1, y0 - q * y1];
  }

  return { gcd: a, x: x0, y: y0 };
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function coprime(a, b) {
  return gcd(a, b) === 1;
}

function calculateEncryptionKey(p, q) {
  const totientOfN = (p - 1) * (q - 1);
  let e;
  while (true) {
    e = randint(2, totientOfN - 1);
    if (coprime(e, totientOfN)) return e;
  }
}

function setPublicKey() {
  const p = document.querySelector('#p').value;
  const q = document.querySelector('#q').value;
  document.querySelector('#e').value = calculateEncryptionKey(p, q);

  const n = document.querySelector('#q').value;
  window.publicKey = { e, n };
}

function calculateDecryptionKey(e, p, q) {
  const totientOfN = (p - 1) * (q - 1);
  // Since 1 = d*e - k*tot(n), pulverizer(tot(n), e) returns {gcd: 1, x: -k, y: d}
  // tot(n) > e implies decryption key is y
  return pulverizer(totientOfN, e).y;
}

function setPrivateKey() {
  const p = document.querySelector('#p').value;
  const q = document.querySelector('#q').value;
  const e = document.querySelector('#e').value;
  document.querySelector('#d').value = calculateDecryptionKey(e, p, q);

  const n = document.querySelector('#q').value;
  window.privateKey = { d, n };
}

function modular_exp(base, exp, mod) {
  if (mod === 1n) return 0n;
  let result = 1n;
  for (let i = 0; i < exp; i++) {
    result = result * base % mod;
  }
  return result;
}


}

function encrypt(plaintext, key) {
  const decodedPlaintext = decode(plaintext);
  return (decodedPlaintext ** key.e) % key.n;
}

function encryptPagePlaintext() {
  const plaintext = document.querySelector('#plaintext').innerText;
  const ciphertext = encrypt(plaintext, window.publicKey);
  document.querySelector('#ciphertext').innerText = ciphertext;
}

function decrypt(ciphertext, key) {
  const decodedPlaintext = (ciphertext ** key.d) % key.n;
  return encode(decodedPlaintext);
}

function decryptPageCiphertext() {
  const ciphertext = document.querySelector('#ciphertext').innerText;
  const plaintext = decrypt(plaintext, window.privateKey);
  document.querySelector('#decrypted-ciphertext').innerText = plaintext;
}

function copyPublicKeyToClipboard() {
  cb.write(JSON.stringify(key));
}
function copyPrivateKeyToClipboard() {
  cb.write(JSON.stringify(key));
}

// This function is for testing purposes only
function generateKeys() {
  const keys = { publicKey: {}, privateKey: {} };

  const min = window.minPrimeSize;
  const max = window.maxPrimeSize;
  const p = generatePrime({ min, max });
  const q = generatePrime({ min, max });
  const n = BigInt(p * q);
  const e = BigInt(calculateEncryptionKey(p, q));
  keys.publicKey = { e, n };
  const d = BigInt(calculateDecryptionKey(e, p, q));
  keys.privateKey = { d, n };
  return keys;
}

module.exports = {
  generateKeys,
  isPrime,
  chooseBase,
  generatePrime,
  randint,
  calculateEncryptionKey,
  calculateDecryptionKey,
  encrypt,
  decrypt,
  pulverizer,
};
