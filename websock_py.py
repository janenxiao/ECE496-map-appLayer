from datetime import datetime
import time
import json

# data = {'result': 2, 'scale': 2}
data = {'result': 6, 'scale': 2, 'x': None, 'y': None, 'r': 0.15}

from websocket import create_connection
ws = create_connection("ws://localhost:8080/gesture")
startTime = time.time()
start = datetime.now()
print('start second:{}.{}'.format(start.second, start.microsecond))
# print("Sending json string...")
# for _ in range(10):
#     ws.send(json.dumps(data))
#     data["x"] = data["x"] + 0.01
#     time.sleep(0.1)
ws.send(json.dumps(data))
print("Sent")

# print("Receiving...")
# result =  ws.recv()
# print(f'Roundtrip time: {(time.time()-startTime)*1000} ms')
# print("Received '%s'" % result)
ws.close()
