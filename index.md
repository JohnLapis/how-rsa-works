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
To make it possible to encrypt and decrypt a message with different keys, they must share a property. The property is that $d$ is the multiplicative inverse of $e$.

$$
  de \equiv 1 \pmod n
$$

$n$ is equal to the product of two distinct large primes $p$ and $q$.

<div class="row">
<div class="col-6" markdown="1">
<button class="btn btn-outline-success my-3">Generate primes</button> \\
$p =$ <input id="p" type="text"> \\
$q =$ <input id="q" type="text"> \\
$n =$ <input id="n" type="text">
</div>

<div class="col-6" markdown="1">
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

Before generating $e$, we must calculate $\phi(n)$. $\phi(x)$ is the totient function of $x$, which gives the number of primes less than $x$. By [Euler's theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem), we know that when $x$ is a product of two primes $a$ and $b$, $\phi(x) = (a-1)(b-1)$. So,

$$
  \phi(n) = (p-1)(q-1)
$$

$e$ must be an integer such that $1 < e < \phi(n)$ and $gcd(e, \phi(n)) = 1$, i.e. $e$ is relatively prime to $\phi(n)$. The value of $e$ is usually equal to $e^{16} + 1 = 65,537$ since it's size doesn't influence a lot on security. Only the performance of encryption is affected if the bit-length of $e$ is too large.

<div class="row">
<div class="col-6" markdown="1">
<button class="btn btn-outline-success my-3">Generate $e$</button> \\
$e =$ <input id="p" type="text">
</div>

<div class="col-6" markdown="1">
 ```javascript
 this.isCode()
 let very_random = "this code"
 if (!very_random) {
   console.assert(false)
 }
 ```
</div>
</div>

The public key is the pair $(e, n)$.

Now we calculate the value of $d$. Because $d$ is the multiplicative inverse of $e$, we can calculate it using [Euclid's algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm), which sth, and choose the.

<div class="row">
<div class="col-6" markdown="1">
<button class="btn btn-outline-success my-3">Calculate $d$</button> \\
$d =$ <input id="p" type="text">
</div>

<div class="col-6" markdown="1">
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

The private key is the pair $(d, n)$.

</div>

<div class="slide" markdown="1">
## Encryption

Let's test some inline math $x$, $y$, $x_1$, $y_1$.

Now a inline math with special character: $|\psi\rangle$, $x'$, $x^\*$.

Test a display math:
$$
   |\psi_1\rangle = a|0\rangle + b|1\rangle
$$
Is it O.K.?

Test a display math with equation number:
\begin{equation}
   |\psi_1\rangle = a|0\rangle + b|1\rangle
\end{equation}
Is it O.K.?

</div>
</div>

<div id="root">

default default default default

</div>

{% include react_app.html %}
