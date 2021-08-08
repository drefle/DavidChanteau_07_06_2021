const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const idUser = decodedToken.idUser;
        if(req.body.idUser && (req.body.idUser !== idUser) && !req.body.isAdmin){
            throw 'Invalid user ID!';
        }else{
            next();
        }
    }catch{
        res.status(401).json({
            error: 'Invalid token!'
        })
    }
}