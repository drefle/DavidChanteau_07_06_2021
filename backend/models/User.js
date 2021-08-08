const db = require('./db')

const User = function(user) {
    this.mail = user.mail;
    this.password = user.password;
    this.lastname = user.lastname;
    this.firstname = user.firstname;
    this.isAdmin = user.isAdmin;
}

User.create = (newUser) =>{
    return new Promise((resolve,reject) => {
        db.query('INSERT INTO User SET ?', newUser, (err, res) => {
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

User.findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM User', (err, res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
            }
            else{
                console.log('Utilisateur : ', res);
                resolve(res);
            }
        })
    })
}

User.findById = (id) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM User WHERE idUser = ?',id,  (err, res) => {
            if(err){
                console.log('error: ', err);
                reject(err);
            }
            else{
                resolve(res);
            }
        })
    })
}

User.findByMail = (mail) => {
    return new Promise((resolve,reject) => {
        db.query('SELECT * FROM User WHERE mail = ?',mail,  (err, res) => {
            if(err){
                reject(err);
            }
            else{
                resolve(res);
            }
        })
    })
}

User.deleteById = (id) => {
    return new Promise((resolve,reject) => {
        db.query('DELETE FROM User WHERE idUser = ?', id, (err,res) => {
            if(err){
                console.log('error: ',err);
                reject(err)
            }
            else{
                resolve(res);
            }
        })
    })
}


module.exports = User;