import * as api from "../api";
import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE,FETCH_BY_SEARCH ,START_LOADING,END_LOADING} from "../constant/actionTypes";


//Action Creator
export const getPost=(page)=>async (dispatch)=> {

    
      try{
            dispatch({type:START_LOADING});
          const {data} =await api.fetchPost(page);
          console.log(data);
          dispatch({type:FETCH_ALL,payload:data})
          dispatch({type:END_LOADING});
       

      }
      catch(e){
          console.log(e.message);

      }
    }

    export const getPostsBySearch=(searchQuery)=>async (dispatch)=>{

        try{
            dispatch({type:START_LOADING});
            const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
            console.log(data);
            dispatch({type:FETCH_BY_SEARCH,payload:data})
            dispatch({type:END_LOADING});
        }catch(e){
             console.log(e);
        }

    }

    export const createPost=(post)=>async (dispatch)=>{
        try{

            const {data} =await  api.createPost(post);
            console.log(data);
            dispatch({type:CREATE,payload:data})
            

        }
        catch(e){

            console.log(e);

        }

    }

    export const  updatePost=(id,postData)=>async (dispatch,getState)=>{

 
    console.log(getState());
         try{   const {data}= await api.updatePost(id,postData);

         dispatch({type:UPDATE,payload:data});
      

         }

         catch(e){
             console.log(e);
         }


    }

    export const deletePost=(id)=> async (dispatch)=>{
        try{

            await api.deletePost(id);
            dispatch({type:DELETE,payload:id});
        }
        catch(e){
        
            console.log(e);

        }

    }

    export const likePost=(id)=> async (dispatch)=>{
        console.log(id)
  
        try{
              
            const {data}=await api.likePost(id);
            dispatch({type:LIKE,payload:data});

        }
        catch(e){

            console.log(e);

        }
    }