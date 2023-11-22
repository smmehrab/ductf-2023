# Secret

## Challenge

Add challenge screenshots.

## Solution

Add the challenge solution here.

- The site forwards to the `/flag` endpoint after logging in with the given credentials, which reads "Sorry, FLAG only for admins."
- It also stores a cookie named `token`, which has the JWT token `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1Y3RmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDA2NTg1Mjd9.ELN7h_dv91syB5kYy6dn5D8aqzZlgurzAngO5aaUCLM` (This will vary due to the `iat` timestamp changing, and the signature being different but that's a non-issue)
- Paste it into [jwt.io](https://jwt.io/).
- We can see that the payload has the `role` claim set to `user`. Based on the clue on `/flag`, the obvious thing to do would be to set it to `admin`.
- However, just changing the payload alone would invalidate the signature found in the third part of the token. We don't have the keys to sign a new signature using the modified payload and there are no clues pointing to a potential password for signing.
- The first approach would be to scan the site for common JWT exploits using [`jwt_tool`](https://github.com/ticarpi/jwt_tool). The command I used was `python jwt_tool.py -t https://secret.ductf.com/flag -rc "token=<JWT_TOKEN_HERE>" -M at -np -cv "Sorry, FLAG only for admins."`
- This didn't work and so the plan B is to bruteforce, assuming that the key is small. Trying all the combinations of alphanumeric characters up to the length of 6 using `hashcat` didn't seem to help either. At that point, it's obvious that the actual solution shouldn't require that much computational power. So the next approach would be to use a wordlist.
- Searching for "JWT token wordlist" brings this up as the first result: https://github.com/wallarm/jwt-secrets/blob/master/jwt.secrets.list
- `hashcat` can be used for a wordlist bruteforce as well, but since the wordlist is small enough, `jwt_tool` alone should suffice. The command for that is `python jwt_tool.py <JWT_TOKEN_HERE> -C -d jwt.secrets.list`
- Bingo, it finds the key `place your jwt secret here`
- Now the token can be forged easily using `python jwt_tool.py <JWT_TOKEN_HERE> -T -S hs256 -p "place your jwt secret here"`
- Follow the interactive process to change the `role` claim to `admin`; the final output will be the forged token with a valid signature.
- Sending a request to `/flag` endpoint with the forged token being set as the cookie reveals the flag. You can do so easily by replacing the cookie in the browser devtools with the new one.

**Flag:** `duCTF{3x4m$_4r3_0v3r4t3d_4nyw4y}`