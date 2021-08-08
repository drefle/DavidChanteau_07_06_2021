export const isLiked = async (idPost) =>{

    const idUser = parseInt(localStorage.getItem("idUser"))

    try{
        let response = await fetch("http://localhost:3000/api/like/" + idPost + "/" + idUser,{
           method: "GET",
           headers: {
               'content-type': 'application/json',
           },
       })

       if(response.ok){
           let data = await response.json()
           if(data.length === 0){
               return null
           }
           return data[0].isLike
           
       }
   }catch(e){
       console.log(e)
   }

}