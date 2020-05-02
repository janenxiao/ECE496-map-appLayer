import json
import time
from datetime import datetime
import multiprocessing

from websocket import create_connection
import socket

UDP_IP = "127.0.0.1"
UDP_PORT = 8080

def send_to_mapapp(data):
    # ws = create_connection("ws://localhost:8080/gesture")
    # ws.send(json.dumps(data))
    # ws.close()

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # Internet, UDP
    sock.sendto(json.dumps(data).encode(), (UDP_IP, UDP_PORT))


if __name__ == '__main__':    
    
    # data = {'result': 2, 'scale': 2}
    data = {'result': 2, 'scale': -2, 'x': None, 'y': None, 'r': 0.15}

    processes = []

    start = datetime.now()
    print('start second:{}.{}'.format(start.second, start.microsecond))

    startTime = time.time()
    for _ in range(1):
        
        p = multiprocessing.Process(target=send_to_mapapp, args=[data])
        p.start()
        processes.append(p)
        data["r"] = data["r"] + 0.05
        

    for process in processes:
        process.join()

    print(f'Elapsed time: {(time.time()-startTime)*1000} ms')

#ws.close()
