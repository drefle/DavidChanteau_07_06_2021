import React, { useState, useEffect } from 'react'
import {getUser} from '../../api/user'
import {getAllComment} from '../../api/comment'
import "./Comment.css"


function Comment (props) {

    const [refreshComments, setRefreshComments] = useState(false)
    const [listComment, setListComment] = useState([])
    const [comment, setComment] = useState('')
    const [idOnePost,setIdOnePost]= useState()
    const [items,setItems] = useState([{
        article:'',
        firstname:'',
        lastname:'',
        idComment:''
    }])

    const commentForm = () => {
        const idUser = parseInt(localStorage.getItem("idUser"))
        const isAdmin = localStorage.getItem("isAdmin")
        let commentaire = comment.create_comment
        let idPost = idOnePost
        let data = {commentaire, idUser, idPost, isAdmin}
        console.log(data)
        try{
            fetch("http://localhost:3000/api/comment/",{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem("token") 
            },
            body: JSON.stringify(data)
            }).then( response => {
                return response.json()
            })
            .then(responseData => {
                if(responseData.error){
                    alert(responseData.error)
                }
                else{
                    setRefreshComments(false)
                }
            }).catch((e)=>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }
    }

    const handleChangeComment = (e) =>{
        setComment({
            [e.currentTarget.name]:e.currentTarget.value
        })
        setIdOnePost(e.currentTarget.id)
    }

    const handleComment = (e) =>{

        e.preventDefault()
        commentForm();
        
    }

    useEffect(()=>{
        getAllComment(props.id)
    },[props.id])

    useEffect(()=>{
        async function main(){
            if(listComment.length > 0){
                let data = []
                for(let comment of listComment){
                    let details = await getUser(comment.user);
                    data.push({
                        idComment: comment.id,
                        firstname:details.firstname,
                        lastname:details.lastname,
                        commentaire:comment.commentaire
                    })
                }
                setItems(data.reverse())
            }
        }
        main()
    },[listComment])

    useEffect(()=>{
        const initializeListComment = async(idPost)=>{
            setListComment(await getAllComment(idPost))
        }
        if(!refreshComments){
            initializeListComment(props.id)
            setRefreshComments(true)
        }
    },[refreshComments,props.id])

    return(
        <div className="mainComment">
            <form className="comment__form" onSubmit={handleComment}>

                <div className="container__textComment">
                    <textarea aria-label="Zone de commentaire" id={props.id} name="create_comment" maxLength="400" placeholder="Écrivez un commentaire !" onChange={handleChangeComment} cols="40" rows="10">
                    
                    </textarea>
                    
                    <button type="submit" aria-label="Commenter la publication">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
                

            </form>
            {listComment.length > 0 &&<div className="container__comment">
            {items.map((oneComment) => (
                <div key={oneComment.idPost} className="comment">
                    <div className="comment__header">
                        <p className="name">{oneComment.firstname} {oneComment.lastname}</p>
                        
                    </div>
                    <div className="comment__content">
                        <p className="commentaire">{oneComment.commentaire}</p>
                    </div>
                
                </div>
                
            ))}
            </div>}
            
        </div>
    )

}

export default Comment;