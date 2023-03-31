async function displayNote(){
    var text =await fetch("http://localhost:3000/post-note/DataNotes")
    var listobj = await text.json()
    lengthListObj = listobj.length
    var title_note = document.getElementsByClassName("timeline-title")
    var content_note = document.getElementsByClassName("content-note")
    for (i=0,j=lengthListObj-1;i<3;i++,j--){
    title_note[i].innerHTML = listobj[j]['Title']
    content_note[i].innerHTML = listobj[j]['Content']
    }
}
setInterval(function () {displayNote()}, 1000);