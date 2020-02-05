var artists=[];

window.onload = function(){
    loadLocalStorage()
}

class Artist {
    constructor(artistName, aboutArtist, imgUrl, li){
        this.artistName = artistName;
        this.aboutArtist = aboutArtist;
        this.imgUrl = imgUrl;
        this.li = li;
    }
} 

function toggleForm() {
    let form = document.getElementById("add_artist_form");
    if (form.style.display === "none") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
    form.reset();
}

function appendArtist(artist){
    let li = document.createElement("li");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let img = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let btn = document.createElement("button");
    div1.className = "img_col";
    div2.className = "info_col";
    p1.className = "artists_names";
    p2.className = "artists_institutions";
    btn.className = "del_btn_col";
    btn.onclick = function(){removeArtist(artist,btn)};
    artist.li = li;
    img.src = artist.imgUrl;
    p1.textContent = artist.artistName;
    p2.textContent = artist.aboutArtist;
    btn.textContent = "Delete";
    div1.appendChild(img);
    div2.appendChild(p1);
    div2.appendChild(p2);
    li.appendChild(div1);
    li.appendChild(div2);
    li.appendChild(btn);
    document.getElementById("artists_container").firstElementChild.appendChild(li);
}

function submitAddForm() {
    if(validateForm()==1)
        return;
    let form = document.getElementById("add_artist_form");
    let inputs = form.getElementsByTagName("input");
    let artistName="";
    let aboutArtist="";
    let imgUrl="";
    for (let input of inputs) {
        if(input.name=="artist_name")
            artistName = input.value;
        if(input.name=="about_artist")
            aboutArtist = input.value;
        if(input.name=="img_url")
            imgUrl = input.value;
    }

    console.log(artistName);
    console.log(aboutArtist);
    console.log(imgUrl);
    let artist = new Artist(artistName, aboutArtist, imgUrl, null);
    appendArtist(artist);
    artists.push(artist);
    localStorage.setItem("artists", JSON.stringify(artists));
    toggleForm();
    showAllArtists();
}

function removeArtist(artist,btn){
    btn.parentNode.remove();
    const index = artists.indexOf(artist);
    if (index > -1)
        artists.splice(index, 1);
    localStorage.setItem("artists", JSON.stringify(artists));
}

function filterArtists(keyWord){
    if(keyWord==null)
        keyWord = document.getElementById("search_field").value;
    artists.forEach(function(artist){
        if(!artist.artistName.toUpperCase().includes(keyWord.toUpperCase())){
            artist.li.style.display = "none";
        }
        else{
            artist.li.style.display = "block";
        }
    })
    document.getElementById("search_field").value=keyWord;
}

function showAllArtists(){
    filterArtists("");
}

function validateForm() {
    let form = document.getElementById("add_artist_form");
    let inputs = form.getElementsByTagName("input");
    for (let input of inputs) {
        if(input.name=="artist_name"||input.name=="about_artist"){
            if(input.value.length>40){
                alert("Max field length for "+input.placeholder+" is 40.");
                return 1;
            }
        }
        if(input.value.length==0){
            alert(input.placeholder+" field cannot be empty.");
            return 1;
        }
    }
    return 0;
}

function loadLocalStorage(){
    artists = JSON.parse(localStorage.getItem("artists"));
    if(artists===null)
        artists = [];
    else{
        artists.forEach(function(artist){
            appendArtist(artist);
        })
    }
}