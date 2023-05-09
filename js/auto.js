function hidebtn (status) {
    const switchs = document.getElementsByClassName('switchelement');

    if (status) {
        for (const each of switchs) {
            each.style.visibility = 'hidden';
        }
        document.getElementById('control-light').innerHTML = "Chế độ tự động"
        document.getElementById('control-pump').innerHTML = "Chế độ tự động"
        document.getElementById('control-pump-fan').innerHTML = "Chế độ tự động"
        document.getElementById('control-fan').innerHTML = "Chế độ tự động"
    } else {
        for (const each of switchs) {
            each.style.visibility = 'visible';
        }
        document.getElementById('control-light').innerHTML = "Chế độ thủ công"
        document.getElementById('control-pump').innerHTML = "Chế độ thủ công"
        document.getElementById('control-pump-fan').innerHTML = "Chế độ thủ công"
        document.getElementById('control-fan').innerHTML = "Chế độ thủ công"
    }
}

function fancontrol() {
    speech = document.getElementById('fanspeech').innerHTML
    if (speech == 1) document.getElementById('fanspeech').innerHTML = 2
    else if (speech == 2) document.getElementById('fanspeech').innerHTML = 3
    else document.getElementById('fanspeech').innerHTML = 1
    console.log(speech)
}


