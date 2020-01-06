import json

data = {'result': 2, 'scale': 2}

from websocket import create_connection
ws = create_connection("ws://localhost:8080/gesture")
# print("Receiving...")
# result =  ws.recv()
# print("Received '%s'" % result)
print("Sending json string...")
ws.send(json.dumps(data))
print("Sent")
ws.close()
