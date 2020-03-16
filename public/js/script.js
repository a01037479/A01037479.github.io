
 window.onload = function(){
     console.log('Page loaded.')
 }

class Artist {
    constructor(artistName, aboutArtist, imgUrl){
        this.name = artistName;
        this.about = aboutArtist;
        this.imgurl = imgUrl;
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

// function appendArtist(artist){
//     let li = document.createElement("li");
//     let div1 = document.createElement("div");
//     let div2 = document.createElement("div");
//     let img = document.createElement("img");
//     let p1 = document.createElement("p");
//     let p2 = document.createElement("p");
//     let btn = document.createElement("button");
//     div1.className = "img_col";
//     div2.className = "info_col";
//     p1.className = "artists_names";
//     p2.className = "artists_institutions";
//     btn.className = "del_btn_col";
//     btn.onclick = function(){removeArtist(artist,btn)};
//     img.src = artist.imgUrl;
//     p1.textContent = artist.artistName;
//     p2.textContent = artist.aboutArtist;
//     btn.textContent = "Delete";
//     div1.appendChild(img);
//     div2.appendChild(p1);
//     div2.appendChild(p2);
//     li.appendChild(div1);
//     li.appendChild(div2);
//     li.appendChild(btn);
//     document.getElementById("artists_container").firstElementChild.appendChild(li);
// }

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

    // let artist = new Artist(artistName, aboutArtist, imgUrl);

    // fetch('/artists/add', {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({artist:artist})
    //    })
    //    .then((response) => response.json())
    //    .then((json) => {
    //     toggleForm();
    //    })
    //    .catch((err) => console.log(err))

}

function removeArtist(btn, id){
    // console.log("artists"+id+" removed");
    // btn.parentNode.remove();
    // fetch('/artists/remove', {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({artistId:id})
    //    })
    //    .then((response) => response.json())
    //    .catch((err) => console.log(err))
}

function filterArtists(keyWord){
    if(keyWord==null)
        keyWord = document.getElementById("search_field").value;
    let ul = document.querySelector('#artists_list');
    while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
    }

    fetch('/search', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({'keyWord':keyWord})
       })
       .then((response) => response.json())
       .then((json) => {
        console.log(json);
        console.log('fetch worked');
        for(let i=0; i<json.length; i++)
            appendArtist(json[i]);
       })
       .catch((err) => console.log(err))
}

function validateForm() {
    let form = document.getElementById("add_artist_form");
    let inputs = form.getElementsByTagName("input");
    for (let input of inputs) {
        if(input.name=="artist_name"||input.name=="about_artist"){
            if(input.value.length>40){
                alert("Max field length for "+input.placeholder+" is 40.");
                return false;
            }
        }
        if(input.value.length==0){
            alert(input.placeholder+" field cannot be empty.");
            return false;
        }
    }
    return true;
}

// function loadArtists(){
//     fetch('/all')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("HTTP error " + response.status);
//             }
//             return response.json();
//         })
//         .then(json => {
//             artists = json;
//             if(artists===null)
//                 artists = [];
//             else{
//                 console.log(artists);
//                 artists.forEach(function(artist){
//                     appendArtist(artist);
//             })
//         }
//         })
//         .catch(function () {
//             console.log("Failed to display artists.");
//         })
// }

