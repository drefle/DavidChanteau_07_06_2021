const db = require('./db')

const Comment = function(comment) {
    this.user = comment.user;
    this.post = comment.post;
    this.commentaire = comment.commentaire;
}

Comment.create = (newComment) =>{
    return new Promise((resolve,reject) => {
        db.query('INSERT INTO Comment SET ?', newComment, (err, res) => {
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

Comment.findById = (id) =>{
    return new Promise((resolve, reject) =>{
        db.query('SELECT * FROM Comment WHERE idComment = ?',id, (err, res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
                return;
            }
            else{
                console.log(res);
                resolve(res);
            }
        })
    })
}

Comment.getAllCommentsByPost = (idPost) =>{
    return new Promise((resolve,reject) =>{
        db.query('SELECT * FROM Comment WHERE post = ?',idPost,(err, res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
                return;
            }
            else{
                console.log(res);
                resolve(res);
            }
        })
    })
}

Comment.getAuthor = (idUser) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT firstname, lastname FROM User LEFT JOIN Comment ON User.idUser = Comment.user WHERE Comment.user = ?', idUser, (err,res) =>{
            if(err){
                console.log('error: ', err);
                reject(err);
            }
            else{
                console.log(res);
                resolve(res);
            }
        })
    })
}

Comment.deleteById = (idComment, idUser) => {
    return new Promise((resolve,reject) => {
        db.query('DELETE FROM Comment WHERE idComment = ? AND user = ?', [idComment,idUser], (err,res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
            }
            else{
                console.log(res);
                resolve(res);
            }
        })
    })
}

Comment.deleteByPost = (idPost) => {
    return new Promise((resolve,reject) => {
        db.query('DELETE FROM Comment WHERE post = ?',idPost, (err,res) => {
            if(err){
                console.log('error: ', err);
                reject(err)
            }
            else{
                console.log(res)
                resolve(res)
            }
        })
    })
}
Comment.deleteByUser = (idUser) => {
    return new Promise((resolve,reject) => {
        db.query('DELETE FROM Comment WHERE user = ?',idUser, (err,res) => {
            if(err){
                console.log('error: ', err);
                reject(err)
            }
            else{
                console.log(res)
                resolve(res)
            }
        })
    })
}

module.exports = Comment