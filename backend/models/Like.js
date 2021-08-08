const db = require('./db')

const Like = function(like) {
    this.isLike = like.isLike;
    this.user = like.user;
    this.post = like.post;
}

Like.create = (newLike) =>{
    return new Promise((resolve,reject) => {
        db.query('INSERT INTO Likes SET ?', newLike, (err, res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
                return;
            }
            else{
                console.log(res.insertId);
                resolve(res.insertId);
            }
        })
    })
}

Like.findLikeUserPost = (idPost,idUser) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM Likes WHERE post = ? AND user = ?',[idPost,idUser], (err, res) =>{
            if(err){
                console.log('error: ',err);
                reject(err);
            }
            else{
                resolve(res);
            }
        })
    })
}

Like.findLikeUser = (idUser) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM Likes WHERE user = ?',idUser, (err, res) =>{
            if(err){
                console.log('error: ',err);
                reject(err);
            }
            else{
                resolve(res);
            }
        })
    })
}

Like.deleteOne = (idPost,idUser) =>{
    return new Promise((resolve,reject) =>{
        db.query('DELETE FROM Likes WHERE post = ? AND user = ?',[idPost,idUser], (err, res) =>{
            if(err){
                console.log('error: ',err);
                reject(err);
                return;
            }
            else{
                console.log('Like supprimé');
                resolve(res);
            }
        })
    })
}
Like.deleteAll = (idPost) =>{
    return new Promise((resolve,reject) =>{
        db.query('DELETE FROM Likes WHERE post = ?',idPost, (err, res) =>{
            if(err){
                console.log('error: ',err);
                reject(err);
                return;
            }
            else{
                console.log('Likes supprimé');
                resolve(res);
            }
        })
    })
}

Like.deleteByUser = (idUser) =>{
    return new Promise((resolve,reject) =>{
        db.query('DELETE FROM Likes WHERE user = ?',idUser, (err, res) =>{
            if(err){
                console.log('error: ',err);
                reject(err);
                return;
            }
            else{
                console.log('Likes supprimé');
                resolve(res);
            }
        })
    })
}

module.exports = Like