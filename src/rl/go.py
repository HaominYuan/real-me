import numpy as np

R = np.array([[5, 0, 0, 0, 0, 0, 10]])
V = np.zeros((1, 7))
P = np.array([
    [0.6, 0.4, 0, 0, 0, 0, 0],
    [0.4, 0.2, 0.4, 0, 0, 0, 0],
    [0, 0.4, 0.2, 0.4, 0, 0, 0],
    [0, 0, 0.4, 0.2, 0.4, 0, 0],
    [0, 0, 0, 0.4, 0.2, 0.4, 0],
    [0, 0, 0, 0, 0.4, 0.2, 0.4],
    [0, 0, 0, 0, 0, 0.4, 0.6],
])
now = 1
gamma = 0.5
s = np.eye(7)

for i in range(100000):
    s = np.dot(P.T, s)
    V = V + now * np.dot(R, s)
    now = now * gamma

print(V)
