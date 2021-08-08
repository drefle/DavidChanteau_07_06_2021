const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like')
const Comment = require('../models/Comment')

exports.signup = async (req,res,next) =>{
    if(!req.body.mail || !req.body.password || !req.body.lastname || !req.body.firstname){
        return res.status(400).send({error: 'Manque un paramètre ' + req.body.mail});
    }
    else{

        try{
            const isMailUsed = await User.findByMail(req.body.mail)
            if(isMailUsed.length !=0 ){
                return res.status(400).send({error: 'Mail déjà utilisé !'});
            }
            else{

                const hashPassword = await bcrypt.hash(req.body.password,10)
                const user = new User({
                    mail: req.body.mail,
                    password: hashPassword,
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    isAdmin:false
                });
                const idUser = await User.create(user)
                return res.status(201).json({
                    idUser: idUser,
                    isAdmin:user.isAdmin,
                    token: jwt.sign(
                        {idUser: idUser},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });
            }
        }catch(e){
            console.log(e)
        }

    
    }
};

exports.login = (req,res,next) =>{
     User.findByMail(req.body.mail)
    .then(user => {
        bcrypt.compare(req.body.password,user[0].password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error: 'Mot de passe incorrect!'});
            }
            return res.status(200).json({
                idUser: user[0].idUser,
                isAdmin:user[0].isAdmin,
                token: jwt.sign(
                    {idUser: user[0].idUser},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(401).json({error: 'Mail non trouvé!'}));
};

exports.getProfil = (req,res,next) => {
    User.findById(req.params.id)
    .then(user => {
        return res.status(200).json({
            mail: user[0].mail,
            lastname: user[0].lastname,
            firstname: user[0].firstname
        })
    }).catch(error => res.status(401).json({error: "Utilisateur non trouvé!"}));
}

exports.deleteProfil = (req,res,next) =>{

    Post.findByUser(req.params.id)
    .then(posts => {
        if(posts.length != 0){
            posts.map(post => {
                Like.deleteAll(post.idPost)
                Comment.deleteByPost(post.idPost)
                Post.deleteById(post.idPost)
            })
        }
        Like.findLikeUser(req.params.id)
        .then(likes => {
            if(likes.length != 0){
                likes.map(like => {
                    if(like.isLike === 1){
                        Post.removeLike(like.post)
                    }else if(like.isLike === -1){
                        Post.removeDislike(like.post)
                    }
                    Like.deleteOne(like.post,req.params.id)
                })
            }
            
        })
        Comment.deleteByUser(req.params.id)
        .then(() => {
            User.deleteById(req.params.id)
            .then(()=>res.status(200).json({message: 'Profil supprimé!'}))
        })
        
        
    })
    .catch(error => res.status(400).json({error})) 
    
}