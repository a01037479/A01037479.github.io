let artistsModel = require('../models/artistsData');

exports.logout = (req,res,next) => {
    res.redirect(301, '/');
};

exports.getAll = (req,res,next) => {
    let artists = artistsModel.getAll();
    artists.then((artists)=>{
        res.render('artists', { pageTitle: 'Artists App', cssPath: '../style/artists.css', artists:artists.rows});
    });
};

exports.add = (req,res,next) => {
    let artist = {name:req.body.artist_name, about:req.body.about_artist, imgurl:req.body.img_url};
    artistsModel.add(artist);
    res.redirect(301, '/artists/');
}


exports.remove = (req,res,next) => {
    let id = req.params.artistId;
    console.log("artist "+id+" removed");
    artistsModel.remove(id);
    res.redirect(301, '/artists/');
}

exports.search = (req,res,next) => {
    let keyWord = req.body.search_keyword;
    let artists = artistsModel.search(keyWord);
    artists.then((artists)=>{
        res.render('artists', { pageTitle: 'Artists App', cssPath: '../style/artists.css', artists:artists.rows});
    });
}