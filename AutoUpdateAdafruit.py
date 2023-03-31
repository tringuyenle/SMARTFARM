import random
import time
import  sys
from  Adafruit_IO import  MQTTClient

AIO_FEED_ID = "anh-sang"
AIO_USERNAME = "tringuyennek"
AIO_KEY = "aio_kgAc827hGozCVrxabIaQOAdG5Rcs"

def  connected(client):
    print("Ket noi thanh cong...")
    client.subscribe(AIO_FEED_ID)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def  message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    value1 = random.randint(0, 100)
    value2 = random.randint(0, 100)
    value3 = random.randint(0, 100)
    value4 = random.randint(0, 100)
    print("Cap nhat:", value1)
    client.publish("anh-sang", value1)
    client.publish("do-am-khong-khi", value2)
    client.publish("nhiet-do", value3)
    client.publish("do-am-dat", value4)
    time.sleep(30)