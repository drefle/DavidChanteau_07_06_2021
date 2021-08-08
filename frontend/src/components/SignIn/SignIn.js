import React, { useState } from 'react'
import {Redirect, NavLink } from "react-router-dom";
import './SignIn.css'
import logo from '../../icon-left-font-monochrome-black.svg';

function SignIn() {

    const [form, setState] = useState({
        mail: '',
        password: '',
        lastname:'',
        firstname: ''
      });

    const [mailValid, setMailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [firstnameValid, setFirstnameValid] = useState(false);
    const [lastnameValid, setLastnameValid] = useState(false);

    const [redirect,setRedirect] = useState(false);
    
    

    const testName = (name) => {
        let regex = new RegExp(/[A-Za-zéèêç']{3,}/);
        return regex.test(name);
    }
    const testMail = (mail) => {
        let regex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/);
        return regex.test(mail);
    }

    //minimum 8 caractères, 1 majuscule, 1 minuscule, un chiffre
    const testPassword = (password) => {
        let regex = new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
        return regex.test(password)
    }
    const handleChange = (e) =>{

        const value = e.currentTarget.value
        const name = e.currentTarget.name

        setState({
            ...form,
            [e.currentTarget.name]:e.currentTarget.value
        })

        switch(name) {

            case "mail":
                testMail(value)? setMailValid(true) : setMailValid(false);
                break;

            case "firstname":
                testName(value)? setFirstnameValid(true) : setFirstnameValid(false);
                break;

            case "lastname":
                testName(value)? setLastnameValid(true) : setLastnameValid(false);
                break;

            case "password":
                testPassword(value)? setPasswordValid(true) : setPasswordValid(false);
                break;

            default:
                alert('Erreur lors de la modification du formulaire');

        }

    }

    const handleSignup = (e) =>{

        e.preventDefault()
        const mail = form.mail;
        const password = form.password;
        const lastname = form.lastname;
        const firstname = form.firstname;
        let data = {mail,lastname,firstname,password}

        try{
            fetch("http://localhost:3000/api/auth/signup",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
            }).then( response =>{
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
                    <h1>INSCRIPTION</h1>
                    <img src={logo} alt=""></img>
                    <form onSubmit={handleSignup}>
                        <label>Nom :
                            <input name='lastname' type="text" value ={form.lastname} onChange={handleChange} className={lastnameValid ? "btn--valid" : "btn--invalid"}/>
                        </label>
                        <label>Prénom :
                            <input name='firstname' type="text" value ={form.firstname} onChange={handleChange} className={firstnameValid ? "btn--valid" : "btn--invalid"}/>
                        </label>
                        <label>Mail :
                            <input name='mail' type="text" value ={form.mail} onChange={handleChange} className={mailValid ? "btn--valid" : "btn--invalid"}/>
                        </label>
                        <label>Mot de passe :
                            <input title = 'Minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre'name='password' type="password" value ={form.password} onChange={handleChange} className={passwordValid ? "btn--valid" : "btn--invalid"}/>
                        </label>
                        <button type="submit" disabled={!mailValid || !passwordValid || !lastnameValid || !firstnameValid}>
                            S'INSCRIRE
                        </button>
                    </form>
                    <div className="container-login">
                        <p>Déjà inscris ?</p>
                        <NavLink to="/login">Se Connecter</NavLink>
                    </div>
                </main>
                {redirect && <Redirect to="/timeline"/> }
            </div>
            </>
        )
}

export default SignIn