window = {};
window.minKeySize = 2 ** 512;
window.maxKeySize = 2 ** 1023; // some browser don't allow 2**1024

function isInt(n) {
  return Math.floor(n) - n === 0;
}

// max and min inclusive
function randint(min, max) {
  console.assert(min <= max, 'First argument must be at most second argument.');
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function factorOutBy(n, factor) {
  console.assert(factor > 1 && isInt(factor), 'Factor must be a positive integer greater than 1.');
  console.assert(n > 1 && isInt(n), 'n must be a positive integer greater than 1.');

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
  console.assert(isInt(n), 'n must be an integer.');

  if (n === 2) return true;
  if (n % 2 === 0) return false;
  if (n < 2) return false;

  const rounds = n <= 40 ? n - 1 : 40; // myb 60

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

function generatePrime(min, max) {
  let n;
  while (true) {
    n = randint(min, max);
    if (isPrime(n)) return n;
  }
}

function setBaseNumbers() {
  document.querySelector('#p').value = generatePrime(window.minKeySize, window.maxKeySize);
  document.querySelector('#q').value = generatePrime(window.minKeySize, window.maxKeySize);
  document.querySelector('#n').value = p * q;
}

function gcd(max, min) {
  if (min === 0) return max;
  return gcd(min, max % min);
}

function coprime(a, b) {
  const max, min = a > b ? [a, b] : [b, a];
  return gcd(max, min) === 1;
}

function calculateEncryptionKey(p, q) {
  const totient_of_n = (p - 1) * (q - 1);
  let e;
  while (true) {
    e = randint(2, totient_of_n - 1);
    if (coprime(e, totient_of_n)) return e;
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
  const totient_of_n = (p - 1) * (q - 1);
  const res = pulverizer(e, totient_of_n);
  return res.algo;
}

function setPrivateKey() {
  const p = document.querySelector('#p').value;
  const q = document.querySelector('#q').value;
  const e = document.querySelector('#e').value;
  document.querySelector('#d').value = calculateDecryptionKey(e, p, q);

  const n = document.querySelector('#q').value;
  window.privateKey = { d, n };
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

module.exports = {
  isPrime,
  chooseBase,
  generatePrime,
  randint,
  calculateEncryptionKey,
  calculateDecryptionKey,
  encrypt,
  decrypt,
};
