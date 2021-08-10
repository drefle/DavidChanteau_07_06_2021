import Comment from '../Comment/Comment.js'
import { NavLink } from "react-router-dom";


function Post (props) {

    const isToday = (date) =>{
        return new Date(Date.now()).toLocaleDateString() === date ?  true :  false;
    }

    return(
        <div key={props.idPost} className="post__box">
            <div  className="post">

                <div className="post__header">
                    <NavLink to={{
                        pathname:'/profile',
                        state:{
                            idUser:props.idUser,
                        },
                    }} className="name">{props.firstname} {props.lastname}</NavLink>
                    {((props.idUser === parseInt(localStorage.getItem("idUser"))) || localStorage.getItem("isAdmin") === "true") &&
                        <div className="delete__post" onClick={() => props.handleDeletePost(props.idPost)}>
                            <i class="fas fa-times"></i>
                        </div>
                    }
                    
                </div>

                <div className="post__content">
                    <p className="article">{props.article}</p>
                </div>  

            </div>
            
            <Comment id={props.idPost}/>

            <div className="article__date">
                {isToday(new Date(props.date_creation).toLocaleDateString())
                ? <p>{new Date(props.date_creation).toLocaleTimeString()}</p>
                : <p>{new Date(props.date_creation).toLocaleDateString()}</p>                             
                }  
            </div>

            <div className="up" onClick={() => props.handleLikePost(1,props.idPost)}>
                {props.isLike === 1
                ? <i class="fas fa-thumbs-up"></i>
                : <i class="far fa-thumbs-up"></i>
                }
                {props.nbLikes}
            </div>

            <div className="down" onClick={() => props.handleLikePost(-1,props.idPost)}>
                {props.isLike === -1
                ? <i class="fas fa-thumbs-down"></i>
                : <i class="far fa-thumbs-down"></i>
                }
                {props.nbDislikes}
            </div>
        </div>
    )

}

export default Post;