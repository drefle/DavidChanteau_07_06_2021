import React, { useState, useEffect }  from 'react';
import { NavLink } from "react-router-dom";
import logoDesktop from '../icon-left-font-monochrome-black.svg';
import logoMobile from '../logo.png'
import Post from './Post/Post.js'
import {deletePost, getAllPost, likePost} from '../api/post.js'
import {isLiked} from '../api/like.js'
import {getUser} from '../api/user.js'
import "./Timeline.css"

function Timeline(){

    const [post, setPost] = useState('');
    const [listPost, setListPost] = useState([])
    const [items,setItems] = useState([{
        article:'',
        firstname:'',
        lastname:'',
        idPost:'',
        date_creation:0,
        user:0,
        nbLikes:0,
        nbDislikes:0,
        isLike:0
    }])
    const [initializationPost, setInitializationPost] = useState(false)
    const [refreshLike, setRefreshLike] = useState(false)

    const handleChangePost = (e) =>{
        setPost({
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    const handleDeletePost = async (idPost) =>{
        if(await deletePost(idPost)){
            setInitializationPost(false)
        }
    }

    const handleLikePost = async (like,idPost) =>{
        if(await likePost(like,idPost)){
            setRefreshLike(false)
            setInitializationPost(false)
        }
    }

    const handlePost = (e) =>{

        e.preventDefault()
        postForm()

    }



    const postForm = () => {

        const idUser = parseInt(localStorage.getItem("idUser"))
        const isAdmin = localStorage.getItem("isAdmin")
        let article = post.create_post
        let data = {article, idUser, isAdmin}

        try{
            fetch("http://localhost:3000/api/post/",{
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
                    setInitializationPost(false)
                }
            }).catch((e)=>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        const initializeListPost = async()=>{
            setListPost(await getAllPost())
        }
        initializeListPost()
    },[])

    useEffect(()=>{

        async function main(){

            if(listPost.length > 0){
                let data = []
                for(let post of listPost){
                    let isLike = await isLiked(post.idPost)
                    let details = await getUser(post.user);
                    data.push({
                        idPost: post.idPost,
                        user:post.user,
                        firstname:details.firstname,
                        lastname:details.lastname,
                        date_creation:post.date_creation,
                        article:post.article,
                        nbLikes:post.nbLikes,
                        nbDislikes:post.nbDislikes,
                        isLike: isLike,
                        isAdmin:details.isAdmin
                    })
                }
                setItems(data.reverse())
            }
        }

        main()
        
    },[listPost])



    useEffect(()=>{
        const initializeListPost = async()=>{
            setListPost(await getAllPost())
        }
        if(!initializationPost){
            initializeListPost()
            setInitializationPost(true)
        }
        if(!refreshLike){
            initializeListPost()
            setRefreshLike(true)
        }
        
    },[initializationPost,refreshLike])

    return (
        <div className="timeline">
            <header>
                <NavLink to="/timeline">
                    <img className='logo__desktop' src={logoDesktop} alt=""/>   
                    <img className='logo__mobile' src={logoMobile} alt=""/>   
                </NavLink> 
                <div className="header__link">
                    <NavLink to={{ 
                        pathname:'/profile',
                        state:{
                            idUser:parseInt(localStorage.getItem("idUser")),
                        }}}>
                        <p className="link__desktop">Profil</p>
                        <i className="link__mobile fas fa-user"></i>
                    </NavLink>
                    <NavLink to="/login" onClick={()=> localStorage.clear()}>
                        <p className="link__desktop">Déconnexion</p>
                        <i class="link__mobile fas fa-sign-out-alt"></i>
                    </NavLink>
                </div>
            </header>

            <main className="mainPost">
                <form className="post__form" onSubmit={handlePost}>

                    <div className="container__text">
                        <textarea name="create_post" maxLength="400" placeholder="Partagez vos pensées !" onChange={handleChangePost} cols="40" rows="10">
                        
                        </textarea>
                    </div>
                    <button type="submit">
                        Publier
                    </button>

                </form>
                {listPost.length > 0 &&<div className="container__post">
                    {items.map((onePost) => (
                        <Post 
                        idPost = {onePost.idPost}
                        idUser = {onePost.user}
                        firstname = {onePost.firstname}
                        lastname = {onePost.lastname}
                        article = {onePost.article}
                        date_creation = {onePost.date_creation}
                        isLike = {onePost.isLike}
                        nbLikes = {onePost.nbLikes}
                        nbDislikes = {onePost.nbDislikes}
                        handleLikePost= {handleLikePost}
                        handleDeletePost ={handleDeletePost}
                        />
                        
                    ))}
                        
                </div>}
            </main>
        </div>
    );
    
};

export default Timeline;