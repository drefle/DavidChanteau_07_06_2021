import React, { useState } from 'react'
import {Redirect, NavLink } from "react-router-dom";
import logo from '../../icon-left-font-monochrome-black.svg';


function Login() {

    const [form, setState] = useState({
        mail: '',
        password: ''
      });

    const [redirect,setRedirect] = useState(false);
    
    const handleChange = (e) =>{
        setState({
            ...form,
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    const handleLogin = (e) =>{

        e.preventDefault()
        const mail = form.mail;
        const password = form.password;
        let data = {mail,password}
        
        try{
            fetch("http://localhost:3000/api/auth/login",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
            }).then( response => {
                if(response.ok){
                    setRedirect(true)
                }
                return response.json()
            })
            .then(responseData => {
                if(responseData.error){
                    alert(responseData.error)
                }
                else{
                    localStorage.setItem("idUser",responseData.idUser)
                    localStorage.setItem("isAdmin",Boolean(responseData.isAdmin))
                    localStorage.setItem("token",responseData.token)
                }
            }).catch((e)=>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }
        
        
    }

    return(
        <>
        <div className="body__sign">
            <main className="container-form">
                    <h1>SE CONNECTER</h1>
                    <img src={logo} alt=""></img>
                <form onSubmit={handleLogin}>
                    <label>Mail :
                        <input name='mail' type="text" value ={form.mail} onChange={handleChange}/>
                    </label>
                    <label>Mot de passe :
                        <input name='password' type="password" value ={form.password} onChange={handleChange}/>
                    </label>
                    <button type="submit">Se Connecter</button>
                </form>
                <div className="container-login">
                    <p>Pas de compte ?</p>
                    <NavLink to="/">S'inscrire</NavLink>
                </div>
            </main>
            {redirect && <Redirect to="/timeline"/> }
        </div>
        </>
    )
}

export default Login