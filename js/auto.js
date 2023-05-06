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



