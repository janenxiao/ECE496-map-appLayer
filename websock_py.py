from datetime import datetime
import time
import json

# data = {'result': 2, 'scale': 2}
data = {'result': None, 'scale': 2, 'x': 0.1, 'y': 0.25}

from websocket import create_connection
ws = create_connection("ws://localhost:8080/gesture")
# ws = create_connection("ws://localhost:8080/handpoint")
startTime = time.time()
start = datetime.now()
print('start second:{}.{}'.format(start.second, start.microsecond))
# print("Sending json string...")
for _ in range(10):
    ws.send(json.dumps(data))
    data["x"] = data["x"] + 0.01
    time.sleep(0.1)
print("Sent")

# print("Receiving...")
# result =  ws.recv()
# print(f'Roundtrip time: {(time.time()-startTime)*1000} ms')
# print("Received '%s'" % result)
ws.close()
