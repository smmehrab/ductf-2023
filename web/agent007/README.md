# Agent007

## Challenge

Upon visiting the URL, you will be shown the following (and nothing else).

[![Agent007 Page](writeup-images/page.png)]()

## Solution

Basically, the hint of the problem is given in the name itself ("Agent007").

We have to change the `User-Agent` to "007" to get the flag from the server. A simple `curl` command can do it.

```bash
curl --user-agent "007" "https://agent007.ductf.com/"
```

This will return the following:

```bash
Congratulations Agent 007!
duCTF{user_agent_is_not_a_secure_way_to_authenticate}
```

Flag: `duCTF{user_agent_is_not_a_secure_way_to_authenticate}`

Server is performing a check for the `User-Agent` like this:

```javascript
app.get('/', (req, res) => {
    const userAgent = req.get('User-Agent');
    if (userAgent && userAgent === '007') {
        res.send('Congratulations Agent 007!\nduCTF{user_agent_is_not_a_secure_way_to_authenticate}');
    } else {
        res.send('I never miss.');
    }
});
```
