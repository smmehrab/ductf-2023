# RSA Once More

## Challenge

In 1980 Leonard Adleman was trying to decipher a message for hours. Suddenly a time traveler from 2040 named Peter Shor appeared in front him and laughed hysterically and said "With the help of my magic device I can do it in a moment".

Files

- [MagicDevice.exe](./MagicDevice.exe)
- [ciphertext.txt](./ciphertext.txt)
- [publickey.txt](./publickey.txt)

## Solution

https://en.wikipedia.org/wiki/Shor%27s_algorithm -> Explains Shors Algorithm
What we guessed here was that the MagicDevice.exe would give us the order given an integer `a`, that is the smallest possible integer `r`, s.t. `a^r = 1 (mod n)`. This can be verified easily that it works. 
- Now wikipedia mentions how it's hard to solve for an odd `r`
- Just try different `a` until you get one that gives you an even `r`
- Also make sure `a^(r/2) != -1 (mod n)` since we want a proper divisor.
- All that remains is to find `p` and `q` s.t. `N = p * q` as explained on wikipedia
Here is the code for that:
```py
import math
from crypto_commons.generic import bytes_to_long
from crypto_commons.rsa.rsa_commons import modinv, rsa_printable

def find(N, e, ct, a, r):
    p1 = math.gcd(pow(a, (r // 2), N) - 1, N)
    p2 = math.gcd(pow(a, (r // 2), N) + 1, N)
    if p1 != 1:
        p = p1
    else:
        p = p2
    q = N // p
    print(rsa_printable(ct, modinv(e, (p - 1) * (q - 1)), N))

with open('ciphertext.txt','rb') as f: 
    ct = f.read()

e = 2390720476829663281263539773702168002724414070712548151310061806313475414529251250528807882905703023414220017343493751059607622869919077823394431285084301
n = 10531655873909595085005973589019435081431516103512697318462846057556449579148091020976230492942267466685363711186386410787413810741466812042929329955880601
a = 3
r = 5265827936954797542502986794509717540715758051756348659231423028778224789573942880415348893045261639921862375258787151675105991237971899021481310235236402

find(n, e, ct, a, r)
```
Also `ciphertext.txt` is a binary file so be sure to read it as one.
