# Rock Paper Scissor

## Challenge

Rock Should guess Paper, Paper should Scissor and Scissor Should guess Rock.

Files

- [rps](./rps)

## Solution

Add the challenge solution here.

### Description

- The contestants are provided an executable file that they need to decompile.
- The challenge is based on the scenario when you don't initialize a seed before using rand() in C. Because it always uses a default seed if not specified explicitly, the random sequence it generates is always the same and thus deterministic.
- Here, Rock, Paper & Scissors are assigned the first 3 default rand() sequences. Contestants are expected to provide the correct number (ie. Paper for Rock, Rock for Scissors) to win. Because the numbers assigned to R P & S are in fact deterministic, if the contestant knows this fact about rand() in C, he/she can easily find out the numbers that have been assigned by running rand() on their machine and win to get the flag.
- Correct guesses will lead to a key which is simply XORed to a predefined array of numbers which yields the Flag.

#### First 3 numbers generated by rand() using default seed:

--- 1804289383 `<br>`
--- 846930886 `<br>`
--- 1681692777 `<br>`

#### Correct Input:

---  846930886 `<br>`
--- 1681692777 `<br>`
--- 1804289383 `<br>`
