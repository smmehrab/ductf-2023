### Description
- There's a 256x256 px image with the flag written on it. The image is converted into a matrix of RGB values. So initial dimension will be (256, 256, 3) - a 3D matrix. But we converted it to a 2D matrix of (65536, 3). We can think of it like this - there are 65536 pixels in the image with each one having a tuple representing (R, G, B)

- Contestants are expected to connect via nc. The server will respond to the first (r1, g1, b1) value. The contestant should reply the same (r1, g1, b1) to get the next (r2, g2, b2). So you should write a script here to get all the 65536 pixel values.

- After getting all the pixels, you should write a Python script to convert it to a numpy array which can be plotted using pyplot.

