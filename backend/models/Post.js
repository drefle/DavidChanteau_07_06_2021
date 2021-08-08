const db = require('./db')

const Post = function(post) {
    this.article = post.article;
    this.user = post.user;
    this.nbLikes = post.nbLikes;
    this.nbDislikes = post.nbDislikes;
}

Post.create = (newPost) =>{
    return new Promise((resolve,reject) => {
        db.query('INSERT INTO Post SET ? , date_creation = NOW()', newPost, (err, res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
            }
            else{
                console.log(res.insertId);
                resolve(res.insertId);
            }
        })
    })
}

Post.findById = (id) =>{
    return new Promise((resolve, reject) =>{
        db.query('SELECT * FROM Post WHERE idPost = ?',id, (err, res) => {
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
Post.findByUser = (id) =>{
    return new Promise((resolve, reject) =>{
        db.query('SELECT * FROM Post WHERE user = ?',id, (err, res) => {
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

Post.getAllPosts = () =>{
    return new Promise((resolve,reject) =>{
        db.query('SELECT * FROM Post',(err, res) => {
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

Post.addLike = (id) =>{
    return new Promise((resolve,reject) => {
        db.query('UPDATE Post SET nbLikes = nbLikes + 1 WHERE idPost = ?',id ,(err,res) =>{
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
Post.addDislike = (id) =>{
    return new Promise((resolve,reject) => {
        db.query('UPDATE Post SET nbDislikes = nbDislikes + 1 WHERE idPost = ?',id ,(err,res) =>{
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
Post.removeDislike = (id) =>{
    return new Promise((resolve,reject) => {
        db.query('UPDATE Post SET nbDislikes = nbDislikes - 1 WHERE idPost = ?',id ,(err,res) =>{
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
Post.removeLike = (id) =>{
    return new Promise((resolve,reject) => {
        db.query('UPDATE Post SET nbLikes = nbLikes - 1 WHERE idPost = ?',id ,(err,res) =>{
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



Post.getAuthor = (idUser) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT firstname, lastname FROM User LEFT JOIN Post ON User.idUser = Post.user WHERE Post.user = ?', idUser, (err,res) =>{
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

Post.getAllComments = (idPost) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM Comments WHERE idPost = ?', idPost,(err,res) => {
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

Post.deleteById = (idPost) => {
    return new Promise((resolve,reject) => {
        db.query('DELETE FROM Post WHERE idPost = ?', idPost, (err,res) => {
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


module.exports = Post