
// const feed = aio.feeds('nhietdo');
function test() {
    console.log("ok")
    const AIO_KEY = 'aio_kgAc827hGozCVrxabIaQOAdG5Rcs';
    const AIO_USERNAME = 'tringuyennek';

    const aio = new AdafruitIO(AIO_USERNAME, AIO_KEY);
    // Get the most recent value from the feed
    const feed = aio.feeds.get('nhietdo');

    feed.receive((data) => {
      console.log(data);
    });
    
    feed.stopReceive();
}