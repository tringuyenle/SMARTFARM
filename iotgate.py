# pip install adafruit-io
# pip install pyserial
# python iot_gate.py

import serial.tools.list_ports
import random
import time
import  sys
from  Adafruit_IO import  MQTTClient
from  Adafruit_IO import  Client

AIO_FEED_ID = ["led","nhietdo"]
AIO_USERNAME = "tringuyennek"
AIO_KEY = "aio_kgAc827hGozCVrxabIaQOAdG5Rcs"

def  connected(client):
    print("Ket noi thanh cong den thiet bi: " +AIO_FEED_ID[0])
    client.subscribe(AIO_FEED_ID[0])

    print("Ket noi thanh cong den thiet bi: " +AIO_FEED_ID[1])
    client.subscribe(AIO_FEED_ID[1])

# def  subscribe(client , userdata , mid , granted_qos):
#     print("Subscribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Da nhan du lieu: " + payload)
    # ser.write((str(payload) + "#").encode())


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    return commPort

# ser = serial.Serial( port=getPort(), baudrate=115200)

client = MQTTClient(AIO_USERNAME , AIO_KEY)

client2 = Client(AIO_USERNAME , AIO_KEY)

client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
# client.on_subscribe = subscribe

client.connect()
client.loop_background()

while True:
    # value0 = random.randint(0, 1)
    value1 = random.randint(0, 96)

    led_data = int(client2.receive(AIO_FEED_ID[0]).value)

    if(led_data == 0 and value1 < 40):
        print("Bat den len o nhiet do: "+str(value1))
        client.publish(AIO_FEED_ID[0], 1)
    elif(led_data == 1 and value1 > 60):
        print("Tat den di o nhiet do: "+str(value1))
        client.publish(AIO_FEED_ID[0], 0)

    print("Cap nhat gia tri cho "+AIO_FEED_ID[1]+": "+str(value1))
    client.publish(AIO_FEED_ID[1], value1)

    time.sleep(5)