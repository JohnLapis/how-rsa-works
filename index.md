---
layout: default
title: How RSA works
---
{% include bootstrap.html %}
{% include mathjax.html %}

<div id="slides" style="display: none;">

<div class="slide" markdown="1">
## Generating the keys

RSA is a public-key cryptosystem, so we must generate a private key $d$ for decryption and a public key $e$ for encryption.
To make it possible to encrypt and decrypt a message with different keys, they must share a property. The property is that $d$ is the multiplicative inverse of $e$ module $\phi(n)$.

\begin{equation}
de \equiv 1 \pmod {\phi(n)}
\end{equation}

$n$ is equal to the product of two distinct large primes $p$ and $q$.

<div class="row">
<div class="col-lg-5" markdown="1">
<button class="btn btn-outline-success my-3">Generate primes</button> \\
$p =$ <input id="p" class="w-75" type="text"> \\
$q =$ <input id="q" class="w-75" type="text"> \\
$n =$ <input id="n" class="w-75" type="text">
</div>

<div class="col-lg-7" markdown="1">
```javascript
let oi = `
?*box showing the code*?
?                      ?
?                      ?
?                      ?
`
```
</div>
</div>

$\phi(x)$ is the totient function of $x$, which gives how many number coprimes with x less than $x$ there are. By [Euler's theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem), we know that, when $x$ is a product of two primes $a$ and $b$, $\phi(x) = (a-1)(b-1)$. So,

\begin{equation}
\phi(n) = (p-1)(q-1)
\end{equation}

$e$ must be an integer such that $1 < e < \phi(n)$ and $gcd(e, \phi(n)) = 1$, i.e. $e$ and $\phi(n)$ are coprime. The value of $e$ is usually $2^{16} + 1 = 65,537$ since its size doesn't influence a lot on security. Only the performance of encryption is affected if the bit-length of $e$ is too large.

<div class="row">
<div class="col-lg-5" markdown="1">
<button class="btn btn-outline-success my-3">Generate $e$</button> \\
$e =$ <input id="e" class="w-75" type="text">
</div>

<div class="col-lg-7" markdown="1">
```javascript
function calculate_e(p, q) {
  const totient_of_n = (p - 1) * (q - 1)
  return random(1, totient_of_n - 1)
}
```
</div>
</div>

The public key is the pair $(e, n)$.

Now we calculate the value of $d$. Since $d$ is the multiplicative inverse of $e$, we can calculate it using the [Extended Euclidean algorithm](https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm), aka pulverizer, which is seomthin different from Euclid's alg.

<div class="row">
<div class="col-lg-5" markdown="1">
<button class="btn btn-outline-success my-3">Calculate $d$</button> \\
$d =$ <input id="d" class="w-75" type="text">
</div>

<div class="col-lg-7" markdown="1">
```javascript
function calculate_d(e, p, q) {
  const totient_of_n = (p - 1) * (q - 1)
  const res = pulverizer(e, totient_of_n)
  return res.algo
}
```
</div>
</div>

The private key is the pair $(d, n)$.

<br>
</div>

<div class="slide" markdown="1">
## Encryption

<div class="mb-2">
<button class="btn btn-info btn-sm">Copy public key to clipboard</button>
<button class="btn btn-info btn-sm">Copy private key to clipboard</button>
</div>

You can input a message you want to be encrypted in the box below. \(Limit: 1000 characters.\)

<textarea id="plaintext" class="w-100">Hello, World!</textarea>

The function to encrypt a message $m$, also called plaintext, into a ciphertext $m'$ is

<div class="row">
<div class="col-lg-5" markdown="1">
\begin{equation}
encrypt(m) = m^e \bmod n = m'
\end{equation}
</div>

<div class="col-lg-7" markdown="1">
```javascript
function encrypt(plaintext, key) {
  const decodedPlaintext = decode(plaintext, "utf-8")
  return (decodedPlaintext ** key.e) % key.n
}
```

The function `decode` converts characters into numbers.
</div>
</div>

<button class="btn btn-outline-success">Encrypt message</button>
<textarea id="ciphertext" class="w-100"></textarea>

<br>
</div>

<div class="slide" markdown="1">
## Decryption

<div class="mb-2">
<button class="btn btn-info btn-sm">Copy public key to clipboard</button>
<button class="btn btn-info btn-sm">Copy private key to clipboard</button>
</div>

The function to decrypt a ciphertext $m'$ into plaintext $m$ is

<div class="row">
<div class="col-lg-5" markdown="1">
\begin{equation}
decrypt(m') = (m')^d \bmod n = m
\end{equation}
</div>

<div class="col-lg-7" markdown="1">
```javascript
function decrypt(ciphertext, key) {
  const decodedCiphertext = (ciphertext ** key.d) % key.n
  return encode(decodedPlaintext, "utf-8")
}
```

The function `encode` converts numbers into characters.
</div>
</div>

<button class="btn btn-outline-success">Decrypt message</button>
<textarea id="decrypted-ciphertext" class="w-100 mb-4"></textarea>

But what is secure about RSA that impedes attackers from decrypting your message? It is the assumed difficulty of factoring the prime numbers of $n$. Before we understand why it's difficult, let's see how an attacker could obtain the private key.

As commented in the first part, $d$ is the multiplicative inverse of $e$
be calculated from the following formula

\begin{equation}
de \equiv 1 \pmod {\phi(n)}
\end{equation}

An attacker already knows $e$ and $n$, why knowing $p$ and $q$ matters? $n$ is a large number and the time required to calculate if a number $x$ is coprime with $n$ for all $x$ less than $n$ is enourmous since each $x$ has to be factored. A quicker approach would be to just factor $n$ into $p$ and $q$ and calculate $(p-1)(q-1)$, but no known algorithm solves this in polynomial time. That's one of the reasons people say $P = NP$ would break cryptography. That would mean that every "hard" problem could be solved "easily", but an algorithm would still need to be develop. Problems in $NP$ can be solved in nondeterministic polynomial time and can have the solution verified in polynomial time, and problems in $P$ can solved and have their solutions verified in polynomial time.

```javascript
function calculate_d(e, p, q) {
  const totient_of_n = (p - 1) * (q - 1)
  const res = pulverizer(e, totient_of_n)
  return res.algo
}
```

<br>
</div>

<div class="slide" markdown="1">
## That's it

some postive message

The javascript code used are available at [tanana](tan/src/rsa.js).

<br>
</div>
</div>

<div id="root">

default default default default

</div>

{% include react_app.html %}
