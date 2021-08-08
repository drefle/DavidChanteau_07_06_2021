const Comment = require('../models/Comment');


/**
 * @param commentaire
 * @param idPost
 * @param idUser
 */

exports.createComment = async (req,res,next) =>{
    if(!req.body.commentaire || (req.body.article == "")){
        return res.status(400).send({error: 'Manque un texte'});
    }
    else{

        try{
            const comment = new Comment({
                commentaire: req.body.commentaire,
                user: req.body.idUser,
                post: req.body.idPost
            });
            const idComment = await Comment.create(comment)
            res.status(201).json({idComment: idComment});
        }catch(e){
            console.log(e)
        }

    
    }
}

/**
 * @param idComment
 * @param idUser
 */

exports.deleteComment = (req,res,next) => {
    Comment.deleteById(req.body.idComment,req.body.idUser)
    .then(()=> res.status(200).json({message: 'Commentaire supprimé!'}))
    .catch(error => res.status(400).json({error}))
    
}

/**
 * @param idPost
 */

exports.getAllComments = (req,res,next) => {
    Comment.getAllCommentsByPost(req.params.id)
    .then(comments => {
        if(comments.length === 0){
            return res.status(400).json(error)
        }
        res.status(200).json(comments)
    })
    .catch(error => res.status(400).json(error))
}