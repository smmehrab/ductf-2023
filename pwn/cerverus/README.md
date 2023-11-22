### Description
- Python "eval"/"exec" commands let you give a string (or multiple for exec) as an input that will be executed on runtime. This is a very powerful and consequently risky command.

- Contestants should access it via nc.

- The goal is to read the "flag.txt" file.

- Every Python module has an implicit member "__builtins__" which contains some basic yet powerful functions such as open(). This knowledge will let the contestants read the file content and print them in the console. To make it more challenging, the validity checker will check if the file name has been inserted directly. The contestants should come up with some kind of string manipulations like below.

### Expected input:
- open('txt.galf'[::-1], 'r').read() 

- open('fxlxaxgx.xtxxxt'[::2], 'r').read()
