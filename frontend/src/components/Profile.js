import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useHistory } from "react-router-dom";
import logo from '../icon-left-font-monochrome-black.svg';
import Post from './Post/Post.js'
import {deletePost, getPostByUser, likePost} from '../api/post.js'
import {isLiked} from '../api/like.js'
import {getUser} from '../api/user.js'
import {deleteProfil} from '../api/user.js'
import "./Profile.css"

function Profile(props) {
    const history = useHistory()
    const location = useLocation()
    const {idUser} = location.state
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
    const [profil,setProfil] = useState({
        firstname:'',
        lastname:'',
        mail:''
    })
    const [refreshLike, setRefreshLike] = useState(false)
    const [initializationPost, setInitializationPost] = useState(false)

    const handleDeletePost = async (idPost) =>{
        if(await deletePost(idPost)){
            setInitializationPost(false)
        }
    }

    const handleDeleteProfil = async () => {
        if(window.confirm("Voulez vous vraiment supprimer votre compte ?")){
            deleteProfil()
            history.push("/login")
        }
    }

    const handleLikePost = async (like,idPost) =>{
        if(await likePost(like,idPost)){
            setRefreshLike(false)
            setInitializationPost(false)
        }
    }

    useEffect(()=>{  
        const initializeListPost = async(idUser)=>{
            setListPost(await getPostByUser(idUser))
        }
        initializeListPost()
    },[idUser])

    useEffect(()=>{  
        async function main(){
            let profil_data = await getUser(idUser)
            setProfil(profil_data)
        }
        main()
    },[idUser])

    useEffect(()=>{
        async function main(){
            
            if(listPost.length > 0){
                let data = []
                for(let post of listPost){
                    let isLike = await isLiked(post.idPost)
                    let details = await getUser(idUser);
                    data.push({
                        idPost: post.idPost,
                        user:post.user,
                        firstname:details.firstname,
                        lastname:details.lastname,
                        date_creation:post.date_creation,
                        article:post.article,
                        nbLikes:post.nbLikes,
                        nbDislikes:post.nbDislikes,
                        isLike: isLike
                    })
                }
                setItems(data.reverse())
            }
        }
        main()
        console.log(listPost)
    },[listPost,idUser])





    useEffect(()=>{
        const initializeListPost = async(idUser)=>{
            setListPost(await getPostByUser(idUser))
        }
        if(!initializationPost){
            initializeListPost(idUser)
            setInitializationPost(true)
        }
        if(!refreshLike){
            initializeListPost(idUser)
            setRefreshLike(true)
        }
    },[refreshLike,initializationPost,idUser])

    return (
        <div className="profile">
            <header>
            <NavLink to="/timeline"><img src={logo} alt=""/></NavLink> 
                <div className="header__link">
                    <NavLink onClick={() => window.location.reload()} to={{ pathname:'/profile',
                                state:{
                                    idUser:localStorage.getItem("idUser"),
                                },
                            }}>Profil</NavLink>
                    <NavLink to="/login">Déconnexion</NavLink>
                </div>
            </header>
            <main>
                <section className="about">
                    <div className="about__title">
                        <h1>À propos</h1>
                        {(parseInt(idUser) === parseInt(localStorage.getItem("idUser"))) &&
                        <span title="Supprimer le profil" className="delete__profile" onClick={() => handleDeleteProfil()}>
                            <i class="fas fa-times"></i>
                        </span>
                        }
                    </div>
                    <ul>
                        <li><h2>Nom</h2><p>{profil.lastname}</p></li>
                        <li><h2>Prénom</h2><p>{profil.firstname}</p></li>
                        <li><h2>Adresse mail</h2><p>{profil.mail}</p></li>
                    </ul>
                    
                </section>
                <section className="mainPost">
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
                </section>
            </main>
            
            
        </div>
    );
};

export default Profile;