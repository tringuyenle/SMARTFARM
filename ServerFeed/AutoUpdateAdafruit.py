import random
import time
import sys
from Adafruit_IO import MQTTClient

AIO_FEED_ID = "anh-sang"
AIO_USERNAME = "tringuyennek"
AIO_KEY = "aio_kgAc827hGozCVrxabIaQOAdG5Rcs"

def connected(client):
    print("Ket noi thanh cong ...")
    client.subscribe(AIO_FEED_ID)

def subscribe(client,userdata,mid,granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)

def message(client, feed_id, payload):
    print("Nhan du lieu: " + payload)

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    anhsang = random.randint(0, 100)
    nhietdo = random.randint(0, 50)
    dakk = random.randint(30, 70)
    dad = random.randint(20, 80)
    print("Cap nhat anh sang:", anhsang)
    client.publish("anh-sang", anhsang)
    print("Cap nhat nhiet do:", nhietdo)
    client.publish("nhiet-do", nhietdo)
    print("Cap nhat do am khong khi:", dakk)
    client.publish("do-am-khong-khi", dakk)
    print("Cap nhat do am dat:", dad)
    client.publish("do-am-dat", dad)
    time.sleep(10)