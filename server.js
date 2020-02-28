let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let fs = require('fs');
let util = require('util'); 
let app = express();
let artists = [];
let artists_json = require('./artists.json');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));  // middleware

// parse application/json
app.use(bodyParser.json()); // middleware

app.use(express.static(path.join(__dirname)));
app.get('/artists' ,(req,res) => {
    res.sendFile(path.join(__dirname,'artists.html'));
}); 

app.listen(process.env.PORT || 5000);

app.post('/add', (req,res) => {
    var artist = req.body;
    
    const readFile = util.promisify(fs.readFile);  
    readFile("artists.json", "utf8")
        .then(
            (content)=>{
                artists = JSON.parse(content);
                artists.push(artist);
                fs.writeFile("artists.json", JSON.stringify(artists)+"\n", "utf8", (err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Artists written to file");
                    }
                });
                res.json(artists); }
            )
        .catch((error)=>console.log(error));    
});

app.get('/all', (req,res) => {
    res.json(artists_json);
});

app.post('/del', (req,res) => {
    var artistId = req.body.artistId;
    
    const readFile = util.promisify(fs.readFile);  
    readFile("artists.json", "utf8")
        .then(
            (content)=>{
                console.log(artistId);
                artists = JSON.parse(content);
                artists.forEach(function(artist){
                    if(artistId==artist.id){
                        const index = artists.indexOf(artist);
                        if (index > -1) {
                            artists.splice(index, 1);
                        }
                    }
                })
                fs.writeFile("artists.json", JSON.stringify(artists)+"\n", "utf8", (err)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Artists written to file");
                    }
                });
                res.json(artists); }
            )
        .catch((error)=>console.log(error));    
});

app.post('/search', (req,res) => {
    let keyWord = req.body.keyWord;
    
    const readFile = util.promisify(fs.readFile);  
    readFile("artists.json", "utf8")
        .then(
            (content)=>{
                artists = JSON.parse(content);
                let searched = [];
                for(let i=0; i<artists.length;i++){
                    if(artists[i].artistName.toUpperCase().includes(keyWord.toUpperCase())){
                        searched.push(artists[i]);
                    }
                }
                res.json(searched); }
            )
        .catch((error)=>console.log(error));    
});