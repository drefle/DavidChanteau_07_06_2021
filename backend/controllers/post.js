const Post = require('../models/Post');
const Like = require('../models/Like')
const Comment = require('../models/Comment')


/**
 * @param article
 * @param idUser
 */

exports.createPost = async (req,res,next) =>{
    try{
        if(!req.body.article || (req.body.article == "")){
            return res.status(400).json({error: 'Vous ne vous êtes pas exprimé !'});
        }
        const post = new Post({
            article: req.body.article,
            nbLikes: 0,
            nbDislikes: 0,
            user: req.body.idUser,
        });
        const idPost = await Post.create(post)
        return res.status(201).json({idPost: idPost});
    }catch(e){
        console.log(e)
    }
}

/**
 * @param idUser
 * @param idPost idPost
 * @param isLike 1 Like, -1 Dislike
 */

exports.likePost = async (req, res, next) =>{
    Like.findLikeUserPost(req.body.idPost,req.body.idUser)
    .then(like =>{
        if(like.length != 0){

            if(like[0].isLike === 1){
                Post.removeLike(req.body.idPost)
            }else if(like[0].isLike === -1){
                Post.removeDislike(req.body.idPost)
            }
            Like.deleteOne(req.body.idPost,req.body.idUser)
            .then(() => res.status(200).json({error: 'Compteur mis à jour'}))
        }
        if(like.length === 0 || like[0].isLike != req.body.isLike){
            const newLike = new Like({
                isLike: req.body.isLike,
                user: req.body.idUser,
                post: req.body.idPost
            })
    
            Like.create(newLike)
            .then(()=>{
                switch(newLike.isLike){

                    case 1: 
                        Post.addLike(req.body.idPost)
                        .then(() => res.status(200).json({error: 'Compteur mis à jour'}))
                        break;

                    case -1:
                        Post.addDislike(req.body.idPost)
                        .then(() => res.status(200).json({error: 'Compteur mis à jour'}))
                        break;

                    default:break;
                }
            })
        }
    })
    .catch(error => res.status(400).json({error}))
}

/**
 * @param idPost
 * @param idUser
 */

exports.deletePost = (req,res,next) => {
    Like.deleteAll(req.body.idPost)
    .then(() => {
        Comment.deleteByPost(req.body.idPost)
        .then(()=>{
            Post.deleteById(req.body.idPost,req.body.idUser)
            .then(()=> res.status(200).json({error: 'Post supprimé!'}))
            
        })
    })
    .catch(error => res.status(400).json({error}))
    
}

exports.getAllPost = (req,res,next) => {
    Post.getAllPosts()
    .then(posts => {
        if(posts.length === 0){
            return res.status(400).json(error)
        }
        res.status(200).json(posts)
    })
    .catch(error => res.status(400).json(error))
}

exports.getPostByUser = (req,res,next) => {
    Post.findByUser(req.params.id)
    .then(posts => {
        if(posts.length === 0){
            return res.status(400).json(error)
        }
        res.status(200).json(posts)
    })
    .catch(error => res.status(400).json(error))
}