import React, { Component } from 'react'

class SignIn extends Component {

    state ={lastname: '', firstname:'', mail:'', password:''}

    handleChange = (e) =>{
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        this.setState({[name]: value})
    }

    handleSubmit = (e) =>{

        e.preventDefault()
        const {mail,lastname,firstname,password} = this.state
        let data = {mail,lastname,firstname,password}
        try{
            fetch("http://localhost:3000/api/auth/signup",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
            }).then( response =>{
                console.log(response.status)
            }).catch((e)=>{
                console.log(e)
            })
        }catch(e){
            console.log(e)
        }
        
        
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Nom :
                    <input name='lastname' type="text" value ={this.state.lastname} onChange={this.handleChange}/>
                </label>
                <label>Prénom :
                    <input name='firstname' type="text" value ={this.state.firstname} onChange={this.handleChange}/>
                </label>
                <label>Mail :
                    <input name='mail' type="text" value ={this.state.mail} onChange={this.handleChange}/>
                </label>
                <label>Mot de passe :
                    <input name='password' type="text" value ={this.state.password} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Envoyer" />
            </form>
        )
    }
}

export default SignIn