export const getAllComment = async (idPost) =>{
    try{
        let response = await fetch("http://localhost:3000/api/comment/" + idPost,{
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