export const deletePost = async(idPost) =>{

    const idUser = parseInt(localStorage.getItem("idUser"))
    const isAdmin = localStorage.getItem("isAdmin")
    let data = {idUser,idPost, isAdmin}

    try{
        let response = await fetch("http://localhost:3000/api/post/" + idPost,{
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'Authorization' : "Bearer " + localStorage.getItem("token") 
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            return true
        }
        return false
    }catch(e){
        console.log(e)
    }

}

export const getAllPost = async () =>{

    try{
        let response = await fetch("http://localhost:3000/api/post/",{
           method: "GET",
           headers: {
               'content-type': 'application/json',
           }
       })

       if(response.ok){
           let data = await response.json()
           return data
       }
       else{
           return []
       }

   }catch(e){
       console.log(e)
   }

}

export const likePost = async (like,post) =>{

    const idUser = parseInt(localStorage.getItem("idUser"))
    const idPost = post;
    let isLike = like;
    let data = {idUser,idPost,isLike}

    try{
        let response = await fetch("http://localhost:3000/api/post/" + idPost +"/" + isLike,{
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            return true
        }
        return false
    }catch(e){
        console.log(e)
    }

}

export const getPostByUser = async (idUser) =>{

    try{
        let response = await fetch("http://localhost:3000/api/post/" + idUser,{
           method: "GET",
           headers: {
               'content-type': 'application/json',
           }
       })

       if(response.ok){
           let data = await response.json()
           return data
       }
       return []
   }catch(e){
       console.log(e)
   }

}