var soluong = 3;
async function xemthem(){
    var listNote = document.getElementById("listNote")
    var text =await fetch("http://localhost:3000/post-note/DataNotes")
    var listobj = await text.json()
    lengthListObj = listobj.length
    soluong++;
    
    createNote(listNote,listobj[lengthListObj-soluong].Title, listobj[lengthListObj-soluong].Content, listobj[lengthListObj-soluong].Tag, soluong-1)
}
function rutngan(){
    var listNote = document.getElementById("listNote")
    listNote.removeChild(listNote.lastChild)

    soluong--;
}
function createNote(listNote, title_note, content_note, option_note, stt){
    let li = document.createElement("li")
    if(stt%2==1){
        li.className="timeline-inverted"
    }
    let div1 = document.createElement("div")
    let i = document.createElement("i")
    if(option_note == 1){
        div1.className = "timeline-badge success"
        i.className ="fa fa-check"
    }
    else if(option_note == 2){
        div1.className="timeline-badge danger"
        i.className ="fa fa-bomb"
    }
    else{
        div1.className="timeline-badge warning"
        i.className="fa fa-credit-card"
    }
    div1.appendChild(i)

    let div2 = document.createElement("div")
    div2.className = "timeline-panel"

    let div2_1 = document.createElement("div")
    div2_1.className = "timeline-heading"

    let h4 = document.createElement("h4")
    h4.className = "timeline-title"
    h4.innerHTML = title_note
    div2_1.appendChild(h4)

    let div2_2 = document.createElement("div")
    div2_2.className ="timeline-body"

    let p = document.createElement("p")
    p.className ="content-note"
    p.innerHTML = content_note
    div2_2.appendChild(p)
    div2.appendChild(div2_1)
    div2.appendChild(div2_2)

    li.appendChild(div1)
    li.appendChild(div2)

    listNote.appendChild(li)

}

async function displayNote(){
    var text =await fetch("http://localhost:3000/post-note/DataNotes")
    var listobj = await text.json()
    lengthListObj = listobj.length
    
    var listNote = document.getElementById("listNote")
    lengthchild = listNote.childElementCount
    /*for( i =0; i <lengthchild; i++){
        listNote.removeChild(listNote.lastChild)

    }*/

    index = 0;

    for(i = lengthListObj-1; i >lengthListObj -soluong-1; i-- ){
        //listNote.removeChild(listNote.lastChild)
        createNote(listNote, listobj[i].Title, listobj[i].Content, listobj[i].Tag, index)
        index++
    }
    
    
}

displayNote()
//setInterval(function () {displayNote()}, 1000);