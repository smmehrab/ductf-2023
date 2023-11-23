# Maze

## Challenge

Add challenge screenshots.

## Solution

- The website reads the clue "Not the destination, *but the journey*. Just pursue and hope that somewhere *along the path* you will find your peace."
- That insinuates something to do with the URL path. We can verify this by entering something arbitrary as the path. The server doesn't respond with a 404, but rather points to the same page as root. There has to be some URL path for which it will return a different page which might have the next clue.
- As for other clues, there are images of a huge L and an R on the site, positioned respectively on the left and the right sides of the page. This most likely means that the maze needs to be transcribed using 'L's and 'R's. Each turn can either be a left turn or a right one.
- Transcribing the path leads to the string `lrrlrlrrrllrllrlrrlrrllllrrlllrrlrlrlrllrrlrlrrlllrlrlrllrrrlrlrlrrllrrrlllrrlrrllrllr`
- We don't really know if the maze should be interpreted as top-to-bottom or bottom-to-top; we'll go with both
```py
DOWN_TO_UP = 'lrrlrlrrrllrllrlrrlrrllllrrlllrrlrlrlrllrrlrlrrlllrlrlrllrrrlrlrlrrllrrrlllrrlrrllrllr'.upper()
UP_TO_DOWN = ''.join(reversed(['L' if x == 'R' else 'R' for x in DOWN_TO_UP]))
```
- We don't know if the path is a continuous string of 'L's and 'R's or if they have slashes in between; we'll explore this possibility as well
```py
DOWN_TO_UP_SLASH = '/'.join(list(DOWN_TO_UP))
UP_TO_DOWN_SLASH = '/'.join(list(UP_TO_DOWN))
```
- "*but the journey*" implies that a prefix is more likely to be the path, so we will check for all the prefixes

This horribly written Python script should do the trick, if our hypotheses are correct:

```py
from pathlib import Path
from time import sleep

from requests import get


DOWN_TO_UP = 'lrrlrlrrrllrllrlrrlrrllllrrlllrrlrlrlrllrrlrlrrlllrlrlrllrrrlrlrlrrllrrrlllrrlrrllrllr'.upper()
UP_TO_DOWN = ''.join(reversed(['L' if x == 'R' else 'R' for x in DOWN_TO_UP]))
DOWN_TO_UP_SLASH = '/'.join(list(DOWN_TO_UP))
UP_TO_DOWN_SLASH = '/'.join(list(UP_TO_DOWN))

print(UP_TO_DOWN)
print(DOWN_TO_UP)
print(UP_TO_DOWN_SLASH)
print(DOWN_TO_UP_SLASH)

SITE_ROOT = 'https://maze.ductf.com/'
path = Path('./ctf_maz_dump')
path.mkdir(parents=True, exist_ok=True)

for i in range(1, len(DOWN_TO_UP), 1):
    current_link = f'{SITE_ROOT}{DOWN_TO_UP[0:i]}'
    res = get(current_link)
    print(f'Currently scraping {current_link} Size: {len(res.content)}')
    with open(f'ctf_maz_dump/{DOWN_TO_UP[0:i].replace("/", "_")}.html', 'wb') as fp:
        fp.write(res.content)
    sleep(2)

for i in range(1, len(UP_TO_DOWN), 1):
    current_link = f'{SITE_ROOT}{UP_TO_DOWN[0:i]}'
    res = get(current_link)
    print(f'Currently scraping {current_link} Size: {len(res.content)}')
    with open(f'ctf_maz_dump/{UP_TO_DOWN[0:i].replace("/", "_")}.html', 'wb') as fp:
        fp.write(res.content)
    sleep(2)

for i in range(1, len(DOWN_TO_UP_SLASH), 2):
    current_link = f'{SITE_ROOT}{DOWN_TO_UP_SLASH[0:i]}'
    res = get(current_link)
    print(f'Currently scraping {current_link} Size: {len(res.content)}')
    with open(f'ctf_maz_dump/{DOWN_TO_UP_SLASH[0:i].replace("/", "_")}.html', 'wb') as fp:
        fp.write(res.content)
    sleep(2)

for i in range(1, len(UP_TO_DOWN_SLASH), 2):
    current_link = f'{SITE_ROOT}{UP_TO_DOWN_SLASH[0:i]}'
    res = get(current_link)
    print(f'Currently scraping {current_link} Size: {len(res.content)}')
    with open(f'ctf_maz_dump/{UP_TO_DOWN_SLASH[0:i].replace("/", "_")}.html', 'wb') as fp:
        fp.write(res.content)
    sleep(2)
```

- After execution, the `ctf_maz_dump` folder will have the HTML files of all the attempted links. One of these should have a different size, if lucky. (Checking file hashes will be more foolproof, but we're going with file sizes for now)
- The sizes are already printed to `stdout` but running `ls` or `dir` in the folder should also suffice.
- `ctf_maz_dump/L_R_R_L_R_L_R_R_R_L_L_R_L_L_R_L_R_R_L_R_R_L_L_L_L_R_R_L_L_L_R_R_L_R_L_R_L.html` seems to have a size of 808 bytes, different from the rest.
- Opening the file gives us the conspicuous string `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiRkxBRyI6ImR1Q1RGezRuZF8xX2NoMCQzX3RoM18wbjNfbDMkJF90cjR2M2xsM2RfYnl9IiwiaWF0IjoxNTE2MjM5MDIyfQ.xNRsptwgz_qRn7uSFx7xQcdTLpSz51eTfJF7cwjKut8`
- This is a JWT token, easily identifiable by the three parts separated using periods (`.`). Paste the string to [jwt.io](https://jwt.io/).
- The payload has the flag in its `FLAG` claim.

**Flag:** `duCTF{4nd_1_ch0$3_th3_0n3_l3$$_tr4v3ll3d_by}`