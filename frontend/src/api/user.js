export const getUser = async (idUser) =>{

    try{
        let response = await fetch("http://localhost:3000/api/auth/" + idUser,{
            method: "GET",
            headers: {
                'content-type': 'application/json',
            }
        })
        if(response.ok){
            let data = await response.json()
            return data
        }
    }catch(e){
        console.log(e)
    }

}

export const deleteProfil = async () =>{
    const idUser = parseInt(localStorage.getItem("idUser"))
    let data = {idUser}
    try{
        let response = await fetch("http://localhost:3000/api/auth/" + idUser,{
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem("token") 
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            return true;
        }
        return false
    }catch(e){
        console.log(e)
    }
}