let db = require('../util/database');

function getAllArtists(){
    return db.query('SELECT * FROM artists');
}

function addArtist(artist){
    let sql = "INSERT INTO artists (name, about, imgurl) VALUES ('" + artist.name + "', '" + artist.about + "', '" + artist.imgurl + "');"
    db.query(sql);
}

function removeArtist(id){
    let sql = "DELETE FROM artists WHERE id = " + id
    db.query(sql);
}

function searchArtists(keyWord){
    let sql = "SELECT * FROM artists WHERE LOWER (name) LIKE '%" + keyWord.toLowerCase()+"%';"
    return db.query(sql);
}

module.exports = {
    getAll : getAllArtists,
    remove : removeArtist,
    add : addArtist,
    search : searchArtists
}