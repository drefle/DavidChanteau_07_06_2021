const Like = require('../models/Like');

/**
 * @param idPost
 * @param idUser
 */

exports.getLikesByUserAndPost = (req,res,next) => {
    Like.findLikeUserPost(req.params.idPost,req.params.idUser)
    .then(likes => {
        if(likes.length === 0){
            return res.status(400).json(error)
        }
        res.status(200).json(likes)
    })
    .catch(error => res.status(400).json(error))
}
