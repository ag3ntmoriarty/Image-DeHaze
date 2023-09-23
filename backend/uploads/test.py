# import numpy as np


# b = np.array([1,2,3,4,5])
# print(b)
# a = "Hello from python!"
# print(a)

# create a new text file
file_path = 'myfile.txt'
with open(file_path, 'w') as file:
    # Write content to the file
    file.write('Hello, this is a text file.\n')
    file.write('You can write multiple lines to it.\n')
    file.write('This is the last line.\n')

